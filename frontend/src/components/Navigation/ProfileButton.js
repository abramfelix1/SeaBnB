import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/";
import * as sessionActions from "../../store/session";
import Modal from "../Modals/Modal";
import "./Navigation.css";
import { useHistory } from "react-router-dom/";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
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
    history.push("/");
    window.scrollTo(0, 0);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {showLoginModal && (
        <Modal closeModal={setShowLoginModal} type={"login"} />
      )}
      {showSignupModal && (
        <Modal closeModal={setShowSignupModal} type={"signup"} />
      )}
      <div className="nav-button" onClick={openMenu}>
        <button>
          <i className="fa-solid fa-bars bars"></i>
          {user?.profileImg ? (
            <img src={user.profileImg} alt="profile-pic"></img>
          ) : (
            <i className="fa-solid fa-circle-user profile"></i>
          )}
        </button>
        <ul className={ulClassName} ref={ulRef}>
          <div className="profile-dropdown-content">
            {user ? (
              <div className="profile-dropdown-logged-info">
                <div className="greetings" onClick={(e) => e.stopPropagation()}>
                  <li>
                    Hello,{" "}
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </li>
                  <li>{user.email}</li>
                  <li className="profile-dropdown-content-break-line"></li>
                </div>

                <NavLink to="/spots/current">
                  <button>Manage Spots</button>
                </NavLink>
                <NavLink to="/reviews/current">
                  <button>Manage Reviews</button>
                </NavLink>
                <NavLink to="/bookings/current">
                  <button>Manage Bookings</button>
                </NavLink>

                <li className="profile-dropdown-content-break-line"></li>
                <button onClick={logout}>Log Out</button>
              </div>
            ) : (
              <div className="profile-button-non-logged-container">
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
              </div>
            )}
          </div>
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
