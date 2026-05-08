import { useLocation, useNavigate } from "react-router-dom";

function Compare() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const compareList = state?.compareList || [];

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
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Compare Colleges
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-4 text-left">Feature</th>
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
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-semibold">💰 Fees</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center">₹{c.fees.toLocaleString()}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">⭐ Rating</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center">{c.rating}</td>
              ))}
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-semibold">🎓 Courses</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center">{c.courses}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">📈 Placement</td>
              {compareList.map((c) => (
                <td key={c._id} className="p-4 text-center">{c.placement_percent}%</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-lg"
        >
          ← Back to Colleges
        </button>
      </div>
    </div>
  );
}

export default Compare;