import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  logout
} from "./base";
import { TextField,Button } from "@mui/material";
import "./Register.css";
import NavBar from "./components/NavBar";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/task-tracker-app");
  }, [user, loading]);

  return (
    <>
    <NavBar user={user} name={user ? user.name: ""} logout={logout}/>
    <div className="register">
      <h1>
        Register Here!!!
      </h1>
      <div className="register__container">
        <TextField
          required
          type="text"
          label="Your Name"
          value={name}
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          margin="normal"
          onChange={(e) => {setEmail(e.target.value);}}
        />
        <TextField
          required
          type="password"
          value={password}
          label="Password"
          margin="normal"
          onChange={(e) => {setPassword(e.target.value);}}
        />
        <div>
          <Button variant="contained" color="primary" onClick={register}>
              Register
          </Button>
        </div>
        <div>
          Already have an account? <Link to="/task-tracker-app/login">Login</Link> now.
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;