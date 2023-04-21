import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, logout } from "./base";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField,Button } from "@mui/material";
import "./Login.css";
import NavBar from "./components/NavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/task-tracker-app");
  }, [user, loading]);

  return (
    <>
    <NavBar user={user} name={user ? user.name: ""} logout={logout}/>
    <div className="login">
      <h1>
        Login Here!!!
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
          type="password"
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
          Don't have an account? <Link to="/task-tracker-app/signup">Register</Link> now.
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;