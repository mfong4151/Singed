
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import { login } from '../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    history.push('/allergies_diet')
  }


  const handleDemoUser = e =>{
    e.preventDefault();
    e.stopPropagation();
    dispatch(login({ email:'demo@singed.com', password: 'password'}))
  }


  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const usernameSubmit = async e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };
    await dispatch(signup(user))
    if (!errors) {
      history.push('/allergies_diet')
    }

  }

  
  useEffect(() => {
    dispatch(clearSessionErrors());
  }, [dispatch]);


  return (
    <div className='session-container'>

    <form className="session-form" onSubmit={usernameSubmit}>
      <h2>Sign Up Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <p>Email</p>
        <input type="text"
          value={email}
          onChange={update('email')}

        />
      </label>
      <div className="errors">{errors?.username}</div>
      <label>
        <p>Username</p>
        <input type="text"
          value={username}
          onChange={update('username')}

        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>
        <p>Password</p>
        <input type="password"
          value={password}
          onChange={update('password')}

        />
      </label>
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      <label>
        <p>Confirm Password</p>
        <input type="password"
          value={password2}
          onChange={update('password2')}

        />
      </label>
      <div className='udc login-button-holder'>
        <input className="session-submit"
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
        />
        <input className="session-submit"
            type='button'
            onClick={handleDemoUser}
            value="Demo User"
          />
      </div>
    </form>
    </div>

  );
}

export default SignupForm;
