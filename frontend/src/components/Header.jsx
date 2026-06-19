import { useEffect, useState } from "react";

function Header({ setPage }) {
  const [darkMode, setDarkMode] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("learnhiveUser")
  );

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {
      document.body.classList.add(
        "light-theme"
      );
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.add(
        "light-theme"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    } else {
      document.body.classList.remove(
        "light-theme"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    }

    setDarkMode(!darkMode);
  };

  const logout = () => {
    localStorage.removeItem(
      "learnhiveUser"
    );

    setPage("login");
  };

  return (
    <header className="topbar">
      <div className="brand">
        <h1>LearnHive</h1>

        <p>
          Learn Together. Grow Together.
        </p>
      </div>

      <div className="auth-meter">
        <span className="dot"></span>

        {user?.photo && (
          <img
            src={user.photo}
            alt=""
            className="mini-avatar"
          />
        )}

        <span>
          {user?.email || "Guest Mode"}
        </span>

        <button
          onClick={toggleTheme}
          className="theme-btn"
        >
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        {user && (
          <button
            className="logout-btn"
            onClick={logout}
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;