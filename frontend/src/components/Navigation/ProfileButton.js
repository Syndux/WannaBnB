import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button">
      <button onClick={openMenu}>
        <i className="fa-solid fa-bars fa-lg"></i>
        <i className="fas fa-user-circle fa-xl" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown-menu">
            <li className="profile-username">Hello, {user.username}</li>
            <li className="profile-email">{user.email}</li>

            <li className="profile-dropdown-divider" />
            <Link to="/spots/owned" className="manage-spot-link">
              Manage Spots
            </Link>

            <Link to="/reviews/current" className="manage-review-link">
              Manage Reviews
            </Link>
            <li className="profile-dropdown-divider" />


            <button onClick={logout}>Log Out</button>
          </div>
        ) : (
          <div className="profile-dropdown-menu">
            <SignUpFormModal onClick={closeMenu} />
            <LoginFormModal onClick={closeMenu} />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
