import React, { useState, useRef } from "react";
import "./Signup.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/feedbacks");
    } catch (e) {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className="form-container">
      <h2>Log In</h2>
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
        <button type="submit" disabled={loading}>
          Log In
        </button>
      </form>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
