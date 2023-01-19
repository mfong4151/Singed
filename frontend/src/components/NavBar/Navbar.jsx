import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import power from '../../assets/power_happy.png';
import CommunityModal from './CommunityModal/CommunityModal';
import {FiMenu} from 'react-icons/fi'
import {openCommunityModal} from './CommunityModal/CommunityModal.jsx'

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();


  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }
  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="navbar">
          <div className='navbar-left'>
            <div className="community-menu-icon" onClick={openCommunityModal}>
              <FiMenu/>
            </div>
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
          {/* {communityModal && <CommunityModal communityModal={communityModal} setCommunityModal={setCommunityModal}/>} */}
          <CommunityModal />
        </div>
      );
    } else {
      return (
        <div className="navbar">
          {/* <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link> */}
          <div className='navbar-left'>
            {/* <div className="community-menu-icon" onClick={openCommunityModal}>
              <FiMenu/>
            </div> */}
            <img src={power} className='logo'></img>
          </div>
          <div className='navbar-right'>
            <Link to={'/signup'}><button>Signup</button></Link>
            <Link to={'/login'}><button>Login</button></Link>
          </div>
        
        {/* {communityModal && <CommunityModal communityModal={communityModal} setCommunityModal={setCommunityModal}/>} */}
        {/* <CommunityModal /> */}
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