import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";

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
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {showLoginModal && <LoginFormModal closeModal={setShowLoginModal} />}
      {showSignupModal && <SignupFormModal closeModal={setShowSignupModal} />}
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              {user.firstName} {user.lastName}
            </li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
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
      </ul>
    </>
  );
}

export default ProfileButton;
