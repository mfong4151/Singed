import {Link} from 'react-router-dom';
import './PageNotFound.css';


function PageNotFound () {
    return (
        <div className="pagenotfound">
            <div className="pagenotfound-left">
                <h1>404</h1>
                <h2>Oops, we can't find what you're looking for</h2>
                <Link to="/" className="pagenotfound-homebutton">Back To Singed</Link>
            </div>
            <div className="pagenotfound-right">

            </div>
        </div>
    )
}

export default PageNotFound;