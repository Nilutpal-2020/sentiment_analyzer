import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import AuthOptions from '../auth/AuthOptions';
import classes from './Navbar.module.css';

class Navbar extends Component {
    render() {
        return (
            <div className={classes.Navbar +  " container text-center"}>
                <div className="conatiner navbar navbar-expand-lg navbar-light justify-content-between">
                    <Link to="/" className="navbar-brand"><h3 className="font-weight-light">SAML</h3></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav1" aria-controls="nav1" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <li className="nav-item">
                        <Link to="/"><h3 className="font-weight-bold mt-2">SAML</h3></Link>
                    </li> */}
                    <div className="collapse navbar-collapse" id="nav1">
                        <ul className="navbar-nav mr-auto mt-1 mt-lg-2">
                            <li className="nav-item">
                                <Link to="/about"><p className="nav-link">About</p></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/recents"><p className="nav-link">View Recent Searches</p></Link>
                            </li>
                        </ul>  
                        <span className="form-inline">
                            <AuthOptions />
                        </span>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Navbar;