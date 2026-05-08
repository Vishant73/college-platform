import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.style.backgroundColor = "#1a2332";
      document.body.style.color = "#e8edf2";
    } else {
      document.body.style.backgroundColor = "#e8edf2";
      document.body.style.color = "#2c3947";
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ backgroundColor: dark ? "#1a2332" : "#2c3947" }} className="px-8 py-4 flex justify-between items-center transition-colors duration-300">
      <Link to="/" className="text-white text-2xl font-bold tracking-wide">
        🎓 CollegeFinder
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
        {user ? (
          <>
            <Link to="/saved" className="text-gray-300 hover:text-white">⭐ Saved</Link>
            <span className="font-semibold" style={{ color: "#c2a96d" }}>👋 {user.name}</span>
            <button
              onClick={handleLogout}
              style={{ backgroundColor: "#547a95" }}
              className="text-white font-bold px-4 py-1 rounded-lg hover:opacity-90"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
            <Link
              to="/register"
              style={{ backgroundColor: "#547a95" }}
              className="text-white font-bold px-4 py-1 rounded-lg hover:opacity-90"
            >
              Register
            </Link>
          </>
        )}
        <button
          onClick={() => setDark(!dark)}
          className="text-white text-xl hover:opacity-80 transition"
          title="Toggle dark mode"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;