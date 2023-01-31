import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import singed from '../../assets/singed_name_light.png';
import CommunityModal from './CommunityModal/CommunityModal';
import {FiMenu} from 'react-icons/fi';
import {openCommunityModal} from './CommunityModal/CommunityModal.jsx'

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  // const [communityModal, setCommunityModal] = useState(false)


  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="navbar">
          <div className='navbar-left'>
            <div className="community-menu-icon" onClick={openCommunityModal}>
              <FiMenu/>
            </div>
            <img src={singed} className='logo'></img>
          </div>
          <div className='navbar-right '>
            <Link to={'/main'}>Main Page</Link>
     
            <Link to={'/allergies_diet'}>Update Allergies and Diet</Link>
            <Link to={'/dish_survey'}>Update Dish Preference</Link>
            <Link to={'/update_preferences'}>Change your Preference Profile</Link>
          </div>
          <CommunityModal />
        </div>
      );
    } else {
      return (
        <div className="navbar nav-before-login">
          {/* <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link> */}
          <div className='navbar-left'>
            
            <img src={singed} className='logo'></img>
          </div>
          <div className='navbar-right before-login'>
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
