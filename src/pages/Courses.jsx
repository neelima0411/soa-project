
import { useEffect, useState } from "react";

function Courses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:8080/courses", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {

        if (response.status === 401) {
          throw new Error("Your session has expired. Please login again.");
        }

        if (!response.ok) {
          throw new Error("Failed to load courses");
        }

        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });

  }, []);

  return (
    <div className="courses-page">

      {/* Page Header */}
      <section className="courses-header">

        <span>ACADEMIC COURSES</span>

        <h1>Explore Our Courses</h1>

        <p>
          Discover available courses and find the right academic
          opportunity for your educational journey.
        </p>

      </section>


      {/* Loading */}
      {loading && (
        <div className="courses-message">
          <div className="loader"></div>
          <p>Loading available courses...</p>
        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="courses-error">
          <div className="error-icon">⚠️</div>

          <h3>Unable to Load Courses</h3>

          <p>{error}</p>

          <button
            className="enroll-button"
            onClick={() => window.location.href = "/login"}
          >
            Go to Login →
          </button>
        </div>
      )}


      {/* Course Cards */}
      {!loading && !error && (
        <section className="course-grid">

          {courses.length === 0 ? (

            <div className="courses-message">
              <h3>No courses available</h3>
              <p>Please check again later.</p>
            </div>

          ) : (

            courses.map((course) => (

              <div className="course-card" key={course.id}>

                <div className="course-card-top">

                  <div className="course-icon">
                    📚
                  </div>

                  <span className="course-badge">
                    AVAILABLE
                  </span>

                </div>


                <div className="course-content">

                  <span className="course-code">
                    {course.courseCode}
                  </span>

                  <h2>
                    {course.courseName}
                  </h2>

                  <div className="course-info">

                    <div>
                      <span className="info-label">
                        Instructor
                      </span>

                      <strong>
                        👨‍🏫 {course.instructor}
                      </strong>
                    </div>


                    <div>
                      <span className="info-label">
                        Tuition Fee
                      </span>

                      <strong className="course-price">
                        ₹{Number(course.tuitionFee).toLocaleString("en-IN")}
                      </strong>
                    </div>

                  </div>


                  <button
                    className="enroll-button"
                    onClick={() => {
                      window.location.href = `/courses/${course.id}`;
                    }}
                  >
                    View Course →
                  </button>

                </div>

              </div>

            ))

          )}

        </section>
      )}

    </div>
  );
}

export default Courses;

