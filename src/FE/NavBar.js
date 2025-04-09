import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'; 

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/call-log">Make Call</Link></li>
        <li><Link to="/appointment-schedule">Appointment Schedule</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  );
};

export default NavBar;