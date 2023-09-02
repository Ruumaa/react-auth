import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { Books } from "./components/Books.jsx";
import { Create } from "./components/Create.jsx";
import { Update } from "./components/Update.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/books" element={<Books />} />
        <Route path="/dashboard/books/edit" element={<Create />} />
        <Route path="/dashboard/books/update" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
