import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const ulRef = useRef();

  const demoHandler = (e) => {
    e.preventDefault();
    const credential = "Demo-lition";
    const password = "password";

    return dispatch(sessionActions.login({ credential, password }));
  };

  const openMenu = () => {
    setShowMenu(!showMenu);
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
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {showLoginModal && <LoginFormModal closeModal={setShowLoginModal} />}
      {showSignupModal && <SignupFormModal closeModal={setShowSignupModal} />}
      <div className="nav-button" onClick={openMenu}>
        <button>
          <i class="fa-solid fa-bars bars"></i>
          <i class="fa-solid fa-circle-user profile"></i>
        </button>
        <ul className={ulClassName} ref={ulRef}>
          <div className="profile-dropdown-content">
            {user ? (
              <div className="profile-dropdown-logged-info">
                <li>Hello, {user.username}</li>
                <li>{user.email}</li>
                <li class="profile-dropdown-content-break-line"></li>
                <button onClick={logout}>Manage Listings</button>
                <button onClick={logout}>Log Out</button>
              </div>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => {
                      closeMenu();
                      setShowLoginModal(!showLoginModal);
                    }}
                  >
                    Log In
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      closeMenu();
                      setShowSignupModal(!showSignupModal);
                    }}
                  >
                    Sign Up
                  </button>
                </li>
                <li>
                  <button onClick={demoHandler}>Demo User</button>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
