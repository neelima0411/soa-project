import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("jwtToken");
    const savedUsername = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    setUsername(savedUsername || "Student");
    setRole(savedRole || "STUDENT");

  }, [navigate]);


  const handleLogout = () => {

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/login");
  };


  return (
    <div className="dashboard-page">

      {/* Dashboard Header */}

      <div className="dashboard-header">

        <div>
          <span className="dashboard-small-title">
            HIGHER EDUCATION PORTAL
          </span>

          <h1>
            Welcome, {username}! 👋
          </h1>

          <p>
            Manage your courses, enrollment and tuition payments
            from your dashboard.
          </p>
        </div>

        <div className="dashboard-user">

          <div className="dashboard-avatar">
            {username.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{username}</strong>
            <span>{role}</span>
          </div>

          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* Statistics */}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon">
            📚
          </div>

          <div>
            <span>Available Courses</span>
            <strong>1+</strong>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon">
            🎓
          </div>

          <div>
            <span>My Enrollments</span>
            <strong>0</strong>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon">
            💳
          </div>

          <div>
            <span>Payments</span>
            <strong>0</strong>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon">
            👤
          </div>

          <div>
            <span>Account Role</span>
            <strong>{role}</strong>
          </div>

        </div>

      </div>


      {/* Main Dashboard */}

      <div className="dashboard-content">

        {/* Course Section */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <span className="dashboard-section-label">
                ACADEMICS
              </span>

              <h2>
                Explore Courses
              </h2>

              <p>
                Browse available courses and start your enrollment.
              </p>
            </div>

            <button
              className="dashboard-view-button"
              onClick={() => navigate("/courses")}
            >
              View All Courses →
            </button>

          </div>


          <div className="dashboard-course-card">

            <div className="dashboard-course-icon">
              💻
            </div>

            <div className="dashboard-course-info">

              <span className="dashboard-course-code">
                24SDCS03R
              </span>

              <h3>
                SOA Programming and Microservices
              </h3>

              <p>
                Learn service-oriented architecture,
                Spring Boot, REST APIs and microservices.
              </p>

              <div className="dashboard-course-details">

                <span>
                  👨‍🏫 Dr.Tulasi Krishna Sajja
                </span>

                <span>
                  💰 ₹50,000
                </span>

              </div>

            </div>

            <button
              className="dashboard-enroll-button"
              onClick={() => navigate("/courses")}
            >
              Explore
            </button>

          </div>

        </section>


        {/* Quick Actions */}

        <section className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <span className="dashboard-section-label">
                QUICK ACCESS
              </span>

              <h2>
                Quick Actions
              </h2>

              <p>
                Quickly access the main features of your account.
              </p>
            </div>

          </div>


          <div className="dashboard-actions">

            <button
              className="dashboard-action-card"
              onClick={() => navigate("/courses")}
            >

              <div className="action-icon">
                📚
              </div>

              <div>
                <h3>
                  Browse Courses
                </h3>

                <p>
                  Explore available courses
                </p>
              </div>

              <span>
                →
              </span>

            </button>


            <button
              className="dashboard-action-card"
              onClick={() => navigate("/courses")}
            >

              <div className="action-icon">
                🎓
              </div>

              <div>
                <h3>
                  Enroll in Course
                </h3>

                <p>
                  Register for a course
                </p>
              </div>

              <span>
                →
              </span>

            </button>


            <button
              className="dashboard-action-card"
              onClick={() => navigate("/payment")}
            >

              <div className="action-icon">
                💳
              </div>

              <div>
                <h3>
                  Tuition Payment
                </h3>

                <p>
                  Manage your tuition payment
                </p>
              </div>

              <span>
                →
              </span>

            </button>

          </div>

        </section>


        {/* Security Section */}

        <section className="dashboard-security">

          <div className="security-icon">
            🔐
          </div>

          <div>

            <h3>
              Your account is protected
            </h3>

            <p>
              You are signed in using secure JWT-based
              authentication.
            </p>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Dashboard;