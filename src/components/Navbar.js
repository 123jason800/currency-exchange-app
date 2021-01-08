import {Link} from 'react-router-dom';
import './../css/Navbar.css';
const Navbar = props => {
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="mx-auto brand-title" to="/">Currency Exchange</Link>
        </nav>
    );
}

export default Navbar;