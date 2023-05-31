import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "../../images/logo.png";
import tree from "../../images/tree.png";
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
        <button className="nav-create-button">
          <NavLink to="/spots/new">Create a Spot</NavLink>
        </button>

        <button className="nav-right-img">
          <img src={tree} alt="tree" />
        </button>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </nav>
  );
}

export default Navigation;
