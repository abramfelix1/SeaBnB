import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import "./form.css";

export default function SignupForm({ closeModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     setErrors({});
  //     return dispatch(
  //       sessionActions.signup({
  //         email,
  //         username,
  //         firstName,
  //         lastName,
  //         password,
  //       })
  //     ).catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) {
  //         setErrors(data.errors);
  //       }
  //     });
  //   }
  //   return setErrors({
  //     confirmPassword:
  //       "Confirm Password field must be the same as the Password field",
  //   });
  // };

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
    <div className="form-container cred">
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
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="form-button" type="submit">
          Sign Up
        </button>
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
