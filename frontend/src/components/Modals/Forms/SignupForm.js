import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import "./form.css";

export default function SignupForm({ closeModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errors, setErrors] = useState({});
  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
    if (
      email?.length &&
      username?.length >= 4 &&
      firstName?.length &&
      lastName?.length &&
      password?.length >= 6 &&
      confirmPassword?.length &&
      password === confirmPassword
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    try {
      setErrors({});
      await dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      );
      closeModal();
    } catch (err) {
      const data = await err.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <div className="form-container cred sign">
      <div className="form-header">
        <i
          className="fa-solid fa-x"
          onClick={() => {
            closeModal();
          }}
        ></i>
        <h1>Sign Up</h1>
      </div>
      {Object.values(errors).length > 0 && (
        <div className="form-errors">
          {errors.email && <p>{errors.email}</p>}
          {errors.username && <p>{errors.username}</p>}
          {errors.firstName && <p>{errors.firstName}</p>}
          {errors.lastName && <p>{errors.lastName}</p>}
          {errors.password && <p>{errors.password}</p>}
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label
            className={firstName?.length ? "active" : ""}
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label
            className={lastName?.length ? "active" : ""}
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label className={email?.length ? "active" : ""} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label
            className={username?.length ? "active" : ""}
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label
            className={password?.length ? "active" : ""}
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label
            className={confirmPassword?.length ? "active" : ""}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div
          className={`form-buttons-container ${!formFilled ? "disabled" : ""}`}
        >
          <button className="form-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div className="form-footer">
        <p>
          Are you ready kids? <span>Aye, aye captain!</span> I can't hear you!{" "}
          <span>Aye, aye captain!</span>, Ooh, who lives in a pineapple under
          the sea? <span>Spongebob Squarepants!</span> Absorbant and yellow and
          porous is he. <span>Spongebob Squarepants!</span> If nautical nonsense
          be something you wish <span>Spongebob Squarepants!</span>
          Then drop on the deck and flop like a fish{" "}
          <span>Spongebob Squarepants!</span>
        </p>
      </div>
    </div>
  );
}
