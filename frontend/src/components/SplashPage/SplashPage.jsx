import './SplashPage.css';
import {Link} from 'react-router-dom';
import {login, logout} from '../../store/session';
import egg_pan from '../../assets/egg_pan.png';
import table from '../../assets/table_dinner.png';
import mapsicon from '../../assets/maps-icon.png';

function SplashPage () {

    return (
        <div className="splash-page-container">
            <div className="splash-page-1 splash-page-component">
                <div className="splash-page-1-left splash-text">
                    <h1>Find the best food for you</h1>
                    <p>Welcome to Singed, a food recommendation app that helps you find the best nearby foods and restaurants for you!</p>
                    {/* <div className="splash-page-buttons">
                        <Link to="/signup" className="signup-button">Sign Up</Link>
                        <Link to="/login" className="login-button">Login</Link>
                    </div> */}
                </div>
                <div className="splash-page-1-right splash-img">
                    <img src={egg_pan}/>
                </div>
            </div>
            <div className="splash-page-2 splash-page-component lightred">
                <div className="splash-page-2-left splash-img">
                    <img src={table}/>
                </div>
                <div className="splash-page-2-right splash-text">
                    <h1>Dynamic Preferences</h1>
                    <p>Singed uses an advanced algorithm to help suggest the food that matches our users preferences</p>
                </div>
            </div>
            <div className="splash-page-3 splash-page-component">
                <div className="splash-page-3-left splash-text">
                    <h1>Location ...</h1>
                    <p>We use a Google Maps Api to ...</p>
                </div>
                <div className="splash-page-3-right splash-img">
                    <img src={mapsicon}/>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;