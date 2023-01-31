
  const submitDemoUser = e =>{
    e.preventDefault()
    dispatch(login({ email:'demo@singed.com', password: 'password'}))
  }
<div className='udc'>
        <input className="session-submit"
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
        <input className="session-submit"
          onClick={()}
          value="Demo User"
        />
      </div>