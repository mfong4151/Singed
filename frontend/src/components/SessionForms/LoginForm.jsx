import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { useHistory } from 'react-router-dom';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) {
    history.push('/main')
  }

  useEffect(() => {
    dispatch(clearSessionErrors());
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    // history.push('/allergies_diet')
  }

  const handleDemoUser = e =>{
    e.preventDefault();
    e.stopPropagation();
    dispatch(login({ email:'demo@singed.com', password: 'password'}))
  }

  return (
    <div className='session-container'>

    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <p>Email</p>
        <input type="text"
          value={email}
          onChange={update('email')}
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
      <div className='udc login-button-holder'>
        <input className="session-submit"
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
        <input className="session-submit" id="demo-user"
            type='button'
            onClick={handleDemoUser}
            value="Demo User"
          />
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
