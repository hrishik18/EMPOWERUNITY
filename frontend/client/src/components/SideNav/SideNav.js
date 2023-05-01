import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="sidenav-container">
      <button className="sidenav-toggle" onClick={toggleNav}>
        <span className="sidenav-toggle-icon">&#9776;</span>
      </button>
      <nav className='sidenav sidenav-open'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/trans">Transaction</Link>
          </li>
          <li>
            <Link to="/history">Transaction History</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
