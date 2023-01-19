const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const FriendRequest = require('../../models/FriendRequest');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  });
});



router.post('/register', validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});


router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    console.log(req)
    console.log(req.host)
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such user found'})
  }

  const user = await User.findById(id)

  if(!user){
      return res.status(404).json({error: 'No such user found'})
  }

  res.status(200).json(user)
});

router.patch('/:id', async (req, res)=>{
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such user found'})
  }
  const user = await User.findByIdAndUpdate({_id: id}, {
      ...req.body
  })
  if(!user){
      return res.status(404).json({error: 'No such user found'})
  }
  res.status(200).json(user)
})

// Send friend request
router.post('/sendfriendrequest', async (req, res) => {
  const {userId} = req.body.sender;
  const {recipientId} = req.body.recipient;

  const foundFriendRequest = await FriendRequest.findOne({
    sender: userId,
    recipient: recipientId,
  });
  if (foundFriendRequest) {
    return res.status(400).send();
  }

  const newFriendRequest = new FriendRequest({
    sender: userId,
    recipient: recipientId,
    status: 'pending',
  });

  newFriendRequest
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// get friend requests of current user
router.get('/getfriendrequests/:id', async (req, res) => {
  const requests = await FriendRequest.find({
    recipient: req.params._id,
  });
  res.status(200).send(requests);
});

router.post('/acceptfriendrequest', async (req, res) => {
  const recipientId = req.body.recipient;
  // this line is probably wrong, the recipient now is the current user
  const senderId = req.body.sender;
  const updatedSender = await User.findOneAndUpdate(
    { _id: senderId, friendList: { $nin: [recipientId] } },
    { $push: { friendList: recipientId } },
    { new: true }
  );
  const updatedRecipient = await User.findOneAndUpdate(
    { _id: recipientId, friendList: { $nin: [senderId] } },
    {
      $push: { friendList: senderId },
    },
    { new: true }
  );
  if (updatedRecipient) {
    const updatedFriendRequest = await FriendRequest.findOneAndUpdate(
      {
        sender: senderId,
        recipient: recipientId,
      },
      {
        $set: { status: 'accepted' },
        $push: { friendshipParticipants: [senderId, recipientId] },
      },
      { new: true }
    );

    const updatedRequests = await FriendRequest.find({
      recipient: recipientId,
      status: 'pending',
    });
    res.status(200).send({
      updatedRequests: updatedRequests,
      updatedUserFriendList: updatedRecipient.friendList,
    });
  }
});

router.post('/rejectfriendrequest', async (req, res) => {
  const recipientId = req.body.recipient;
  const senderId = req.body.sender;
  const deletedFriendRequest = await FriendRequest.findOneAndDelete({
    sender: senderId,
    recipient: recipientId,
  });

  const updatedRequests = await FriendRequest.find({
    recipient: recipientId,
    status: 'pending',
  });

  res.status(200).send({
    updatedRequests: updatedRequests,
  });
});


module.exports = router;
