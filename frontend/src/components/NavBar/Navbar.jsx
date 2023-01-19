import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import power from '../../assets/power_happy.png';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const handleLogoClick = (e) => {
    e.preventDefault();
    console.log('logo clicked')
    history.push('/')
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="navbar">
          <div className='navbar-left' onClick={handleLogoClick}>
            <img src={power} className='logo'></img>
          </div>
          <div className='navbar-right'>
            <Link to={'/tweets'}>All Foods</Link>
            <Link to={'/profile'}>Profile</Link>
            <Link to={'/foods/new'}>Write a Foods</Link>
            <Link to={'/allergies_diet'}>Allergies and Diet</Link>
            <Link to={'/dish_survey'}>Dish Survey</Link>
            <button onClick={logoutUser}>Logout</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar">
          {/* <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link> */}
          <div className='navbar-left' onClick={handleLogoClick}>
            <img src={power} className='logo'></img>
          </div>
          <div className='navbar-right'>
            <Link to={'/signup'}><button>Signup</button></Link>
            <Link to={'/login'}><button>Login</button></Link>
          </div>


        </div>
      );
    }
  }

  return (
    <>
      { getLinks() }
    </>
  );
}

export default NavBar;
