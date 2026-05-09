import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaRupeeSign, FaGraduationCap, FaChartLine, FaArrowLeft } from "react-icons/fa";

function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/colleges/${id}`)
      .then((res) => {
        setCollege(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#e8edf2" }}>
      <p className="text-gray-500 text-xl">Loading...</p>
    </div>
  );

  if (!college) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#e8edf2" }}>
      <p className="text-gray-500 text-xl">College not found!</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#e8edf2" }} className="min-h-screen">

      {/* Hero Banner */}
      <div style={{ backgroundColor: "#2c3947" }} className="py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
          >
            <FaArrowLeft /> Back to Colleges
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">{college.name}</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-gray-300">
              <FaMapMarkerAlt style={{ color: "#c2a96d" }} /> {college.location}
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-white font-bold text-sm" style={{ backgroundColor: "#c2a96d" }}>
              <FaStar size={12} /> {college.rating} Rating
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <FaRupeeSign className="mx-auto mb-2 text-2xl" style={{ color: "#547a95" }} />
            <p className="text-gray-500 text-sm">Annual Fees</p>
            <p className="text-2xl font-bold mt-1" style={{ color: "#2c3947" }}>
              ₹{college.fees.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <FaStar className="mx-auto mb-2 text-2xl" style={{ color: "#c2a96d" }} />
            <p className="text-gray-500 text-sm">Rating</p>
            <p className="text-2xl font-bold mt-1" style={{ color: "#2c3947" }}>{college.rating}/5</p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <FaChartLine className="mx-auto mb-2 text-2xl" style={{ color: "#547a95" }} />
            <p className="text-gray-500 text-sm">Placement</p>
            <p className="text-2xl font-bold mt-1" style={{ color: "#2c3947" }}>{college.placement_percent}%</p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <FaGraduationCap className="mx-auto mb-2 text-2xl" style={{ color: "#547a95" }} />
            <p className="text-gray-500 text-sm">Courses</p>
            <p className="text-2xl font-bold mt-1" style={{ color: "#2c3947" }}>{college.courses.split(",").length}+</p>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#2c3947" }}>🎓 Courses Offered</h2>
          <div className="flex flex-wrap gap-3">
            {college.courses.split(",").map((course, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full font-semibold text-sm"
                style={{ backgroundColor: "#e8edf2", color: "#2c3947" }}
              >
                {course.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Placement Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#2c3947" }}>📈 Placement Stats</h2>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-gray-500 text-sm w-24">Placement Rate</span>
            <div className="flex-1 bg-gray-100 rounded-full h-5">
              <div
                className="h-5 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${college.placement_percent}%`, backgroundColor: "#547a95" }}
              >
                <span className="text-white text-xs font-bold">{college.placement_percent}%</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-3">Based on last 3 years average placement data.</p>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#2c3947" }}>💬 Student Reviews</h2>
          <div className="flex flex-col gap-4">
            {[
              { name: "Amit S.", stars: 5, review: "Great campus, excellent faculty and very good placement opportunities!" },
              { name: "Priya M.", stars: 4, review: "Amazing infrastructure and great peer learning environment." },
              { name: "Rahul K.", stars: 5, review: "Best decision of my life. Highly recommend to everyone!" },
            ].map((r, i) => (
              <div key={i} className="rounded-xl p-4" style={{ backgroundColor: "#e8edf2" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: "#547a95" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#2c3947" }}>{r.name}</p>
                    <p style={{ color: "#c2a96d" }}>{"★".repeat(r.stars)}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">"{r.review}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CollegeDetail;