import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Compare() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const compareList = state?.compareList || [];
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (compareList.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500 text-xl">No colleges selected to compare!</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#e8edf2" }} className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: "#2c3947" }}>
        ⚖ Compare Colleges
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-md">
          <thead>
            <tr style={{ backgroundColor: "#2c3947" }} className="text-white">
              <th className="p-4 text-left rounded-tl-2xl">Feature</th>
              {compareList.map((c) => (
                <th key={c._id} className="p-4 text-center">{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-semibold">📍 Location</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center">{c.location}</td>
              ))}
            </tr>
            <tr className="border-b" style={{ backgroundColor: "#e8edf2" }}>
              <td className="p-4 font-semibold">💰 Fees</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center font-bold" style={{ color: "#547a95" }}>
                  ₹{c.fees.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">⭐ Rating</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center font-bold" style={{ color: "#c2a96d" }}>
                  {c.rating}/5
                </td>
              ))}
            </tr>
            <tr className="border-b" style={{ backgroundColor: "#e8edf2" }}>
              <td className="p-4 font-semibold">🎓 Courses</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center">{c.courses}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">📈 Placement</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center font-bold" style={{ color: "#2c3947" }}>
                  {c.placement_percent}%
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="text-white font-bold px-8 py-3 rounded-xl hover:opacity-90"
          style={{ backgroundColor: "#547a95" }}
        >
          ← Back to Colleges
        </button>
      </div>
    </div>
  );
}

export default Compare;