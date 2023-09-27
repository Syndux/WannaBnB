import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";

import "./SignupForm.css";

function SignUpForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formDisable, setFormDisable] = useState(true);
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    if (email && username.length >= 4 && firstName && lastName && password.length >= 6 && confirmPassword && password === confirmPassword) {
      setFormDisable(false);
    } else {
      setFormDisable(true);
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setServerErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="signup-form-group">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errors.email && <p className="signup-error-message">{errors.email}</p>}
        <div className="signup-form-group">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {errors.username && (
          <p className="signup-error-message">{errors.username}</p>
        )}
        <div className="signup-form-group">
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        {errors.firstName && (
          <p className="signup-error-message">{errors.firstName}</p>
        )}
        <div className="signup-form-group">
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        {errors.lastName && (
          <p className="signup-error-message">{errors.lastName}</p>
        )}
        <div className="signup-form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.password && (
          <p className="signup-error-message">{errors.password}</p>
        )}
        <div className="signup-form-group">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errors.confirmPassword && (
          <p className="signup-error-message">{errors.confirmPassword}</p>
        )}
        {serverErrors.length > 0 && (
          <ul className="signup-error-message">
            {serverErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className={`signup-button ${formDisable ? "disabled" : ""}`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
