import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Footer.css';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github_white.png';

function Footer () {

  return (
    <div className="footer">

        {/* <div className='footer-left'>
        </div> */}
        <div className='contacts'>
          {/* <h3>Contact Us!</h3> */}
            <div className="bio-links">
              Max Fong
              <a href="https://www.linkedin.com/in/mfong415/" target="_blank"><img src={linkedin} id='linkedin'/></a>
              <a href="https://www.github.com/mfong4151/" target="_blank"><img src={github} id='github'/></a>
            </div>

            <div className="bio-links">
              Alex Luong
              <a href="https://www.linkedin.com/in/alex-luong-15b488183/" target="_blank"><img src={linkedin} id='linkedin'/></a>
              <a href="https://www.github.com/AlexL-07/" target="_blank"><img src={github} id='github'/></a>
            </div>
            <div className="bio-links">
              <a href="https://www.ziyuanhan.com/" target="_blank" id='personal_project'>Ziyuan Han</a>
              <a href="https://www.linkedin.com/in/ziyuan-byron-han/" target="_blank"><img src={linkedin} id='linkedin'/></a>
              <a href="https://www.github.com/ByronHan333/" target="_blank"><img src={github} id='github'/></a>
            </div>
            <div className="bio-links">
              Patrick Choi
              <a href="https://www.linkedin.com/in/patrickwchoi/" target="_blank"><img src={linkedin} id='linkedin'/></a>
              <a href="https://www.github.com/patrickwchoi/" target="_blank"><img src={github} id='github'/></a>
            </div>
        </div>


      </div>
  );
}

export default Footer;
