import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./form.css";

export default function LoginForm({ closeModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
    if (credential?.length >= 4 && password?.length >= 6) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [credential, password]);

  if (sessionUser) return <Redirect to="/" />;

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await dispatch(sessionActions.login({ credential, password }));
      closeModal();
    } catch (err) {
      const data = await err.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const demoHandler = (e) => {
    e.preventDefault();
    const credential = "Demo-lition";
    const password = "password";
    closeModal();
    return dispatch(sessionActions.login({ credential, password }));
  };

  return (
    <div className="form-container cred log">
      <div className="form-header">
        <i
          className="fa-solid fa-x"
          onClick={() => {
            closeModal();
          }}
        ></i>
        <h1>Log In</h1>
      </div>
      {errors.credential && (
        <div className="form-errors">
          <p>{errors.credential}</p>
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div className="input-container log">
          <label className={credential?.length ? "active" : ""} htmlFor="cred">
            Username or Email
          </label>
          <input
            id="cred"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="input-container log">
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
        <div
          className={`form-buttons-container ${!formFilled ? "disabled" : ""}`}
        >
          <button className="form-button" type="submit">
            Log In
          </button>
        </div>
      </form>
      <p className="break-line"></p>
      <div className="demo-button-container">
        <button className="demo-button" onClick={demoHandler}>
          Demo User
        </button>
      </div>
    </div>
  );
}
