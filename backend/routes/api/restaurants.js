const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/restaurants"
  });
});

module.exports = router;