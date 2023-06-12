import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formDisable, setFormDisable] = useState(true);

  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) {
      setFormDisable(false);
    } else {
      setFormDisable(true);
    }
  }, [credential, password]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data.message) data.errors = { credential: data.message };
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const loginDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }));
  }

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form-container">
        {errors.credential && (
          <p className="login-error-message">{errors.credential}</p>
        )}
        <div className="login-form-group">
          <input
            type="text"
            id="credential"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`login-button ${formDisable ? "disabled" : ""}`}
        >
          Log In
        </button>
      </form>
      <div className="login-demo-user-button" onClick={loginDemo}>Demo User</div>
    </div>
  );
}

export default LoginForm;
