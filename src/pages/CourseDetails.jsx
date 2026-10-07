import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CourseDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("jwtToken");

    fetch(`http://localhost:8080/courses/${id}`, {
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
          throw new Error("Course not found");
        }

        return response.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });

  }, [id]);


  if (loading) {
    return (
      <div className="courses-message">
        <div className="loader"></div>
        <p>Loading course details...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="courses-error">

        <div className="error-icon">
          ⚠️
        </div>

        <h3>Course Not Found</h3>

        <p>{error}</p>

        <button
          className="enroll-button"
          onClick={() => navigate("/courses")}
        >
          ← Back to Courses
        </button>

      </div>
    );
  }


  return (
    <div className="course-details-page">

      {/* Header */}
      <section className="course-details-header">

        <span className="details-badge">
          COURSE DETAILS
        </span>

        <h1>
          {course.courseName}
        </h1>

        <p>
          Explore course information and begin your enrollment.
        </p>

      </section>


      {/* Course Details Card */}
      <section className="course-details-card">

        <div className="details-icon">
          📚
        </div>


        <div className="details-content">

          <span className="details-code">
            {course.courseCode}
          </span>

          <h2>
            {course.courseName}
          </h2>


          <div className="details-info">

            <div className="details-item">

              <span>
                👨‍🏫 Instructor
              </span>

              <strong>
                {course.instructor}
              </strong>

            </div>


            <div className="details-item">

              <span>
                💳 Tuition Fee
              </span>

              <strong className="details-price">
                ₹{Number(course.tuitionFee).toLocaleString("en-IN")}
              </strong>

            </div>

          </div>


          <div className="details-actions">

            <button
              className="back-button"
              onClick={() => navigate("/courses")}
            >
              ← Back to Courses
            </button>


            <button
              className="enroll-button details-enroll"
              onClick={() =>
                navigate(`/enroll/${course.id}`)
              }
            >
              Enroll Now →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default CourseDetails;

