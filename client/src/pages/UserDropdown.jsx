import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const UserDropdown = ({ userName, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="user-dropdown" onClick={toggleDropdown}>
      <FontAwesomeIcon className="fa-icon user-icon" icon={faUser} />
      {showDropdown && (
        <div className="dropdown-content">
          {userName && <Link to="/dashboard">My Orders</Link>}
          <Link to="/customer-care">Customer Care</Link>
          {userName ? (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
