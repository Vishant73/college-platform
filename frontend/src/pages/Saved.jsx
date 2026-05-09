import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Saved() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    axios.get(`${import.meta.env.VITE_API_URL}/api/saved/${user.id}`)
      .then((res) => {
        setSaved(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleRemove = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/saved/${id}`);
      setSaved(saved.filter((s) => s._id !== id));
    } catch (err) {
      alert("Something went wrong");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#e8edf2" }}>
      <p className="text-xl" style={{ color: "#2c3947" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#e8edf2" }} className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: "#2c3947" }}>
        ⭐ My Saved Colleges
      </h1>

      {saved.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-xl">No saved colleges yet!</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-white px-6 py-2 rounded-lg"
            style={{ backgroundColor: "#547a95" }}
          >
            Browse Colleges
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((college) => (
            <div
              key={college._id}
              onClick={() => navigate(`/college/${college.collegeId}`)}
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition border-2 border-transparent hover:border-blue-300"
            >
              <div className="h-2 w-full rounded-full mb-4" style={{ backgroundColor: "#547a95" }}></div>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#2c3947" }}>
                {college.collegeName}
              </h2>
              <p className="text-gray-500 mt-1">📍 {college.location}</p>
              <p className="text-gray-600 mt-1">💰 Fees: ₹{college.fees.toLocaleString()}</p>
              <p className="text-gray-600 mt-1">⭐ Rating: {college.rating}</p>
              <p className="text-gray-600 mt-1">📈 Placement: {college.placement_percent}%</p>
              <button
                onClick={(e) => handleRemove(e, college._id)}
                className="mt-4 w-full text-white font-bold py-2 rounded-xl hover:opacity-90"
                style={{ backgroundColor: "#c2a96d" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;