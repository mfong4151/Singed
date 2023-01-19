import './SplashPage.css';
import {Link} from 'react-router-dom';
import {login, logout} from '../../store/session';

function SplashPage () {

    return (
        <div className="splash-page-container">
            <div className="splash-page-content">
                <h1>Find the best foods for you</h1>
                <p>Power is a food recommendation app that helps you find the best foods for you based on your allergies and diet preferences.</p>
                <div className="splash-page-buttons">
                    <Link to="/signup" className="signup-button">Sign Up</Link>
                    <Link to="/login" className="login-button">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;