import React from "react";
import "./navbar.css"
import {logout} from '../base'


export default function Navbar () {
  return (
    <nav className="navigation">
      <div
        className="navigation-menu" style={{ display: "flex" }}>
            <button style={{ marginLeft: "auto" }} className='btn btn-primary mt-2' onClick={logout}>Sign Out</button>
      </div>
    </nav>
  );
};