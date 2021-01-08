import './../css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub,faLinkedin} from '@fortawesome/free-brands-svg-icons';
const Footer = props => (
    <footer className="footer p-3"> 
        <div className="container">
            <div className="row">
                <div className="col-12 text-center my-2 col-lg-4">
                    <FontAwesomeIcon className="mr-2" size="lg" icon={faGithub} color="black"/>
                    <a href="https://github.com/123jason800">Github</a>
                </div>
                <div className="col-12 text-center my-2 col-lg-4">
                    <FontAwesomeIcon className="mr-2" size="lg" icon={faLinkedin} color="black"/>
                    <a href="https://www.linkedin.com/in/jason-ouyang-7995a21bb/">LinkedIn</a>
                </div>
                <div className="col-12  text-center my-2 col-lg-4">
                    <a href="https://priceless-thompson-3253e2.netlify.app/">Porfolio Page</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;