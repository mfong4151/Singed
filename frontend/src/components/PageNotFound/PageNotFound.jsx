import {Link} from 'react-router-dom';
import './PageNotFound.css';
import error_img from '../../assets/404_img.png';

function PageNotFound () {
    return (
        <div className="pagenotfound">
            <div className="pagenotfound-left">
                <h1>404</h1>
                <h2>Oops, we can't find what you're looking for</h2>
                <Link to="/main" className="pagenotfound-homebutton">Back To Singed</Link>
            </div>
            <div className="pagenotfound-right">
                <Link to="/attributions">
                    <img className="pagenotfound-img"   src={error_img} />
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound;