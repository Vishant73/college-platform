import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaMapMarkerAlt, FaStar, FaGraduationCap, FaChartLine, FaRupeeSign } from "react-icons/fa";

function CollegeCard({ college, onCompare, isSelected }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to save colleges!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/saved", {
        userId: user.id,
        collegeId: college._id,
        collegeName: college.name,
        location: college.location,
        fees: college.fees,
        rating: college.rating,
        placement_percent: college.placement_percent,
      });
      alert("College saved successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    onCompare(college);
  };

  return (
    <div
      onClick={() => navigate(`/college/${college._id}`)}
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 ${isSelected ? "border-blue-500" : "border-transparent"}`}
    >
      {/* Top color bar */}
      <div className="h-2 w-full" style={{ backgroundColor: "#547a95" }}></div>

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-bold hover:underline" style={{ color: "#2c3947" }}>
            {college.name}
          </h2>
          {/* Rating badge */}
          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-white text-sm font-bold" style={{ backgroundColor: "#c2a96d" }}>
            <FaStar size={10} /> {college.rating}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <FaMapMarkerAlt style={{ color: "#547a95" }} />
          <span>{college.location}</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <FaRupeeSign className="mx-auto mb-1" style={{ color: "#547a95" }} />
            <p className="text-xs text-gray-500">Fees</p>
            <p className="text-sm font-bold" style={{ color: "#2c3947" }}>
              {(college.fees / 100000).toFixed(1)}L
            </p>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <FaChartLine className="mx-auto mb-1" style={{ color: "#547a95" }} />
            <p className="text-xs text-gray-500">Placement</p>
            <p className="text-sm font-bold" style={{ color: "#2c3947" }}>
              {college.placement_percent}%
            </p>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <FaGraduationCap className="mx-auto mb-1" style={{ color: "#547a95" }} />
            <p className="text-xs text-gray-500">Courses</p>
            <p className="text-sm font-bold" style={{ color: "#2c3947" }}>
              {college.courses.split(",").length}+
            </p>
          </div>
        </div>

        {/* Courses tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {college.courses.split(",").slice(0, 3).map((course, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: "#e8edf2", color: "#2c3947" }}
            >
              {course.trim()}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCompareClick}
            className={`flex-1 py-2 rounded-xl text-white text-sm font-semibold transition ${isSelected ? "bg-red-500 hover:bg-red-600" : "hover:opacity-90"}`}
            style={!isSelected ? { backgroundColor: "#2c3947" } : {}}
          >
            {isSelected ? "✕ Remove" : "⚖ Compare"}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
            style={{ backgroundColor: "#547a95" }}
          >
            <FaBookmark size={12} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollegeCard;