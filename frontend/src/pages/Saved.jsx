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

  const handleRemove = async (id) => {
    try {
     axios.delete(`${import.meta.env.VITE_API_URL}/api/saved/${id}`)

      setSaved(saved.filter((s) => s._id !== id));
    } catch (err) {
      alert("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        My Saved Colleges
      </h1>

      {saved.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-xl">No saved colleges yet!</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Browse Colleges
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((college) => (
            <div key={college._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-700">{college.collegeName}</h2>
              <p className="text-gray-500 mt-1">📍 {college.location}</p>
              <p className="text-gray-600 mt-1">💰 Fees: ₹{college.fees.toLocaleString()}</p>
              <p className="text-gray-600 mt-1">⭐ Rating: {college.rating}</p>
              <p className="text-gray-600 mt-1">📈 Placement: {college.placement_percent}%</p>
              <button
                onClick={() => handleRemove(college._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg"
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