import React from 'react';
import '../App.css'

const NavBar = ({ user, name, logout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container d-flex w-100 mw-100">
                <div className="navbar-brand text-center" style={{fontSize: "28px"}}>Task Tracker App</div>
                <div className="d-flex align-items-center">
                    {user && <span className="mx-3" style={{color: "darkgray"}}>Welcome {name}</span>}
                    {user && <button className='btn btn-light' onClick={logout}>Sign Out</button>}
                </div>
            </div>
        </nav>

      
    );
};  

export default NavBar;