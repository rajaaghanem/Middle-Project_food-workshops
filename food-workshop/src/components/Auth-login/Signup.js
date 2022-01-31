import React, { useState, useRef } from "react";
import "./Signup.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/feedbacks");
    } catch (e) {
      console.log(e);
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <div variant="danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div id="email">
          <label>Enter your Email</label>
          <input type="email" ref={emailRef} />
        </div>
        <div id="password">
          <label>Enter a Password</label>
          <input type="password" ref={passwordRef} />
        </div>
        <div id="password-confirm">
          <label>Password confirmation</label>
          <input type="password" ref={passwordConfirmRef} />
        </div>
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Signup;
