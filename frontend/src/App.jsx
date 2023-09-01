import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
