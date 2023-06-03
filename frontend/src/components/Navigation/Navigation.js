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
        {/* <button className="nav-create-button"> */}
        {/* <NavLink className="nav-create-link" to="/spots/new">
            Create a Spot
          </NavLink>
        </button> */}
        <div className="nav-create-button-container">
          <NavLink to="/spots/new">
            <button className=" nav-create-link">Create a Spot</button>
          </NavLink>
        </div>

        <button className="nav-right-img">
          <img src={tree} alt="tree" />
        </button>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </nav>
  );
}

export default Navigation;
