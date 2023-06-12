import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import airbnbLogo from "./airbnb_logo.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar">
      <NavLink exact to="/" className="logo">
        <img src={airbnbLogo} alt="Logo" width="100" height="30" />
      </NavLink>

      {isLoaded && (
        <>
          {sessionUser && (
            <NavLink to="/spots/new" className="new-spot-link">
              <button onClick={(e) => {e.stopPropagation()}}>Create a New Spot</button>
            </NavLink>
          )}
          <ProfileButton user={sessionUser} />
        </>
      )}
    </div>
  );
}

export default Navigation;
