import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CollegeCard from "../components/CollegeCard";

function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [fees, setFees] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/colleges")
      .then((res) => {
        setColleges(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filtered = colleges.filter((c) => {
    const matchName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchLocation = location === "" || c.location.toLowerCase().includes(location.toLowerCase());
    const matchFees = fees === "" ||
      (fees === "low" && c.fees <= 100000) ||
      (fees === "medium" && c.fees > 100000 && c.fees <= 250000) ||
      (fees === "high" && c.fees > 250000);
    const matchCourse = course === "" || c.courses.toLowerCase().includes(course.toLowerCase());
    return matchName && matchLocation && matchFees && matchCourse;
  });

  const locations = [...new Set(colleges.map((c) => c.location))];

  const handleCompare = (college) => {
    const exists = compareList.find((c) => c._id === college._id);
    if (exists) {
      setCompareList(compareList.filter((c) => c._id !== college._id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare maximum 3 colleges!");
        return;
      }
      setCompareList([...compareList, college]);
    }
  };

  const goToCompare = () => {
    navigate("/compare", { state: { compareList } });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#e8edf2" }}>
      <p className="text-xl" style={{ color: "#2c3947" }}>Loading colleges...</p>
    </div>
  );

  return (
    <div className="min-h-screen dark:bg-gray-900" style={{ backgroundColor: "#e8edf2" }}>

      {/* Hero Section */}
      <div style={{ backgroundColor: "#2c3947" }} className="py-14 px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Find Your <span style={{ color: "#c2a96d" }}>Dream College</span>
        </h1>
        <p className="text-gray-400 mb-8 text-lg">Search from {colleges.length}+ top colleges across India</p>

        {/* Filters */}
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center">
          <input
            type="text"
            placeholder="🔍 Search college by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-52 rounded-xl px-4 py-3 focus:outline-none text-gray-700 bg-white shadow"
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl px-4 py-3 focus:outline-none text-gray-700 bg-white shadow"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="rounded-xl px-4 py-3 focus:outline-none text-gray-700 bg-white shadow"
          >
            <option value="">All Fees</option>
            <option value="low">Below ₹1 Lakh</option>
            <option value="medium">₹1 - 2.5 Lakhs</option>
            <option value="high">Above ₹2.5 Lakhs</option>
          </select>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="rounded-xl px-4 py-3 focus:outline-none text-gray-700 bg-white shadow"
          >
            <option value="">All Courses</option>
            <option value="CS">CS</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="Civil">Civil</option>
            <option value="Chemical">Chemical</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="px-8 pt-6 pb-2 max-w-7xl mx-auto">
        <p className="text-gray-500 text-sm font-medium">{filtered.length} colleges found</p>
      </div>

      {/* Compare floating button */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={goToCompare}
            className="text-white font-bold px-8 py-3 rounded-full shadow-xl hover:opacity-90 transition"
            style={{ backgroundColor: "#c2a96d" }}
          >
            ⚖ Compare {compareList.length} Colleges →
          </button>
        </div>
      )}

      {/* College Grid */}
      <div className="px-8 pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((college) => (
            <CollegeCard
              key={college._id}
              college={college}
              onCompare={handleCompare}
              isSelected={!!compareList.find((c) => c._id === college._id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-gray-500 text-xl">No colleges found!</p>
            <p className="text-gray-400 text-sm mt-2">Try changing your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;