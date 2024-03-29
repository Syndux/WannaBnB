import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import LoginFormModal from "../Modals/LoginFormModal";
import SignUpFormModal from "../Modals/SignUpFormModal";

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
      <button onClick={openMenu} className="button-exclude">
        <i className="fa-solid fa-bars fa-lg" />
        <i className="fas fa-user-circle fa-xl" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown-menu">
            <li className="profile-username">Hello, {user.username}</li>
            <li className="profile-email">{user.email}</li>

            <p className="profile-dropdown-divider" />
            <li>
              <Link to="/spots/owned" className="manage-link" onClick={closeMenu}>
                Manage Spots
              </Link>
            </li>
            <li>
              <Link
                to="/reviews/current"
                className="manage-link"
                onClick={closeMenu}
              >
                Manage Reviews
              </Link>
            </li>

            <p className="profile-dropdown-divider" />
            <li>
              <Link to="/about-dev" className="manage-link" onClick={closeMenu}>
                About The Dev
              </Link>
            </li>
            <p className="profile-dropdown-divider" />
            <div className="profile-dropdown-button-container">
              <button className="logout-button button-exclude" onClick={logout}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-dropdown-menu">
            <li>
              <SignUpFormModal onClick={closeMenu} />
            </li>
            <li>
              <LoginFormModal onClick={closeMenu} />
            </li>
            <li>
              <Link to="/about-dev" className="about-dev-link" onClick={closeMenu}>
                About The Dev
              </Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
