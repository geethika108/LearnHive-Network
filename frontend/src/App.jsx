import "./styles/styles.css";
import { useState } from "react";

import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  const user = JSON.parse(
    localStorage.getItem("learnhiveUser")
  );

  const [page, setPage] = useState(
    user ? "dashboard" : "login"
  );

  return (
    <div className="app-shell">

      <Header setPage={setPage} />

      {page === "login" && (
        <Login setPage={setPage} />
      )}

      {page === "register" && (
        <Register setPage={setPage} />
      )}

      {page === "dashboard" && (
        <Dashboard />
      )}

    </div>
  );
}

export default App;