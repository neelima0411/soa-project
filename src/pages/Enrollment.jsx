import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Enrollment() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");
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


  const handleEnrollment = async () => {

    if (!studentId.trim()) {
      setError("Please enter your Student ID.");
      return;
    }

    setError("");
    setMessage("");
    setEnrolling(true);

    try {

      const token = localStorage.getItem("jwtToken");

      const response = await fetch(
        `http://localhost:8080/enrollments/${studentId}/${id}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.status === 401) {
        throw new Error("Your session has expired. Please login again.");
      }

      // Duplicate enrollment
      if (response.status === 409) {
        const duplicateMessage = await response.text();

        setError(
          duplicateMessage ||
          "Student is already enrolled in this course."
        );

        return;
      }

      if (!response.ok) {
        throw new Error("Enrollment failed");
      }

      const data = await response.json();

      console.log("Enrollment Response:", data);
      console.log("Enrollment ID:", data.id);

      // Go to payment page and pass enrollment ID
      navigate("/payment", {
        state: {
          course: course,
          studentId: studentId,
          enrollmentId: data.id
        }
      });

    } catch (err) {

      console.error(err);

      setError(
        err.message === "Your session has expired. Please login again."
          ? err.message
          : "Enrollment failed. Please make sure the backend services are running."
      );

    } finally {

      setEnrolling(false);

    }
  };


  if (loading) {
    return (
      <div className="courses-message">

        <div className="loader"></div>

        <p>
          Loading enrollment information...
        </p>

      </div>
    );
  }


  if (error && !course) {
    return (
      <div className="courses-error">

        <div className="error-icon">
          ⚠️
        </div>

        <h3>
          Unable to Load Course
        </h3>

        <p>
          {error}
        </p>

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

    <div className="enrollment-page">

      <section className="enrollment-header">

        <span className="enrollment-badge">
          COURSE ENROLLMENT
        </span>

        <h1>
          Complete Your Enrollment
        </h1>

        <p>
          Enter your student details to register for this course.
        </p>

      </section>


      <section className="enrollment-card">

        <div className="enrollment-course">

          <div className="enrollment-course-icon">
            🎓
          </div>

          <div>

            <span className="enrollment-course-code">
              {course.courseCode}
            </span>

            <h2>
              {course.courseName}
            </h2>

            <p>
              👨‍🏫 {course.instructor}
            </p>

          </div>

        </div>


        <div className="enrollment-divider"></div>


        <div className="enrollment-form">

          <label>
            Student ID
          </label>

          <input
            type="text"
            placeholder="Enter your Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <div className="fee-box">

            <span>
              Tuition Fee
            </span>

            <strong>
              ₹{Number(course.tuitionFee).toLocaleString("en-IN")}
            </strong>

          </div>


          {error && (
            <div className="enrollment-error">
              ⚠️ {error}
            </div>
          )}


          {message && (
            <div className="enrollment-success">
              ✅ {message}
            </div>
          )}


          {!message ? (

            <button
              className="confirm-enrollment-button"
              onClick={handleEnrollment}
              disabled={enrolling}
            >

              {enrolling
                ? "Processing Enrollment..."
                : "Confirm Enrollment →"
              }

            </button>

          ) : (

            <button
              className="confirm-enrollment-button"
              onClick={() => navigate("/courses")}
            >
              ← Back to Courses
            </button>

          )}


          <button
            className="cancel-enrollment-button"
            onClick={() => navigate(`/courses/${id}`)}
          >
            Cancel
          </button>

        </div>

      </section>

    </div>

  );
}

export default Enrollment;