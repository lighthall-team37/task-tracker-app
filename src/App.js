import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Signup";
import TaskList from "./components/TaskList";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/task-tracker-app/login" element={<Login />} />
          <Route exact path="/task-tracker-app/signup" element={<Register />} />
          <Route exact path="/task-tracker-app" element={<TaskList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;