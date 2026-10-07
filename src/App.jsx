import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Enrollment from "./pages/Enrollment";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            🎓 SMART HIGHER EDUCATION
          </span>

          <h1>
            Your Journey to
            <span> Academic Success </span>
            Starts Here
          </h1>

          <p>
            Discover courses, enroll easily, and manage your tuition
            payments through one simple and secure education portal.
          </p>

          <div className="hero-buttons">
            <button className="primary-button">
              📚 Explore Courses
            </button>

            <button className="secondary-button">
              👤 Student Login
            </button>
          </div>

        </div>

        <div className="hero-card">

          <div className="hero-card-icon">
            🎓
          </div>

          <h3>Higher Education</h3>

          <p>
            Course Enrollment & Tuition Processing System
          </p>

          <div className="hero-stat">

            <div>
              <strong>24SDCS03R</strong>
              <span>Featured Course</span>
            </div>

            <div>
              <strong>₹50,000</strong>
              <span>Tuition Fee</span>
            </div>

          </div>

        </div>

      </section>


      {/* Features Section */}
      <section className="features">

        <div className="section-heading">

          <span>WHY USE OUR PORTAL?</span>

          <h2>
            Everything You Need in One Place
          </h2>

          <p>
            A simple and convenient platform for managing your
            academic course journey.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">📚</div>

            <h3>Explore Courses</h3>

            <p>
              Browse available courses and view course,
              instructor and tuition information.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">📝</div>

            <h3>Easy Enrollment</h3>

            <p>
              Enroll in your selected course through a
              simple and convenient process.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">💳</div>

            <h3>Tuition Processing</h3>

            <p>
              Process tuition payments and view your
              payment status easily.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">🔐</div>

            <h3>Secure Access</h3>

            <p>
              Secure student and instructor access using
              authentication and JWT security.
            </p>

          </div>

        </div>

      </section>


      {/* Call To Action */}
      <section className="cta">

        <div>

          <span>READY TO GET STARTED?</span>

          <h2>
            Begin Your Academic Journey Today
          </h2>

          <p>
            Explore available courses and take the next step
            toward your academic goals.
          </p>

        </div>

        <button className="cta-button">
          View Courses →
        </button>

      </section>

    </div>
  );
}


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/courses"
          element={<Courses />}
          />

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
          />

        <Route
          path="/enroll/:id"
          element={<Enrollment />}
          />
          <Route
            path="/payment"
            element={<Payment />}
            />

          <Route
            path="/login"
            element={<Login />}
            />
            <Route
            path="/register" 
            element={<Register />}
             />

            <Route 
            path="/dashboard" 
            element={<Dashboard />} 
            />
            
      </Routes>

    </BrowserRouter>
  );
}

export default App;