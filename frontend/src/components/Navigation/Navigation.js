import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "../../images/logo.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <NavLink exact to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="nav-right">
        <button className="nav-create-button">Seabnb your home</button>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </nav>
  );
}

export default Navigation;
