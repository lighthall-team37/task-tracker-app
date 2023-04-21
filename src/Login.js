import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./base";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField,Button } from "@mui/material";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="login">
      <h1>
        Task Tracker
      </h1>
      <div className="login__container">
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          margin="normal"
          onChange={(e) => {setEmail(e.target.value);}}
        />
        <br></br>
        <TextField
          required
          value={password}
          label="Password"
          margin="normal"
          onChange={(e) => {setPassword(e.target.value);}}
        />
        <br/>
        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={() => logInWithEmailAndPassword(email, password)}>
              Log in
          </Button>
        </div>
        <div>
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;