import './SplashPage.css';
import {Link} from 'react-router-dom';
import {login, logout} from '../../store/session';
import egg_pan from '../../assets/egg_pan.png';

function SplashPage () {

    return (
        <div className="splash-page-container">
            <div className="splash-page-1 splash-page-component">
                <div className="splash-page-1-left splash-text">
                    <h1>Find the best foods for you</h1>
                    <p>Power is a food recommendation app that helps you find the best foods for you based on your allergies and diet preferences.</p>
                    <div className="splash-page-buttons">
                        <Link to="/signup" className="signup-button">Sign Up</Link>
                        <Link to="/login" className="login-button">Login</Link>
                    </div>
                </div>
                <div className="splash-page-1-right splash-img">
                    <img src={egg_pan}/>
                </div>
            </div>
            <div className="splash-page-2">

            </div>
        </div>
    )
}

export default SplashPage;