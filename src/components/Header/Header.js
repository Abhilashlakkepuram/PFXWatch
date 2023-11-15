import React, { useState, useContext } from 'react';

import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";
import './index.css';


const Header = ()=>{
    let navigate = useNavigate();

    const onClickLogout=()=>{
        Cookies.remove('jwt_token')
        navigate("/auth")
    }
 

    return(
        <nav className="navbar container">
            <div>
                <Link to="/" className="link-item">
                    <img
                        src="PFX Watch Black.png"
                        className="website-logo"
                        alt="website logo"
                    />
                </Link>
            </div>
            <div>
                <button type="button" className="logout-button" onClick={onClickLogout}>
                    Logout
                </button>
            </div>
        </nav>
    )
};

export default Header;
