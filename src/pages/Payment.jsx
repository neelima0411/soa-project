import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;
  const studentId = location.state?.studentId;
  const enrollmentId = location.state?.enrollmentId;

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!course || !studentId || !enrollmentId) {
    return (
      <div className="courses-error">

        <div className="error-icon">
          ⚠️
        </div>

        <h3>
          Payment Information Missing
        </h3>

        <p>
          Please start the enrollment process again.
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


  const handlePayment = async () => {

    setProcessing(true);
    setError("");

    try {

      const token = localStorage.getItem("jwtToken");

      // Step 1: Process payment
      const response = await fetch(
        `http://localhost:8080/payments/${studentId}/${course.tuitionFee}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.status === 401) {
        throw new Error(
          "Your session has expired. Please login again."
        );
      }

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const paymentData = await response.json();

      console.log("Payment Response:", paymentData);


      // Step 2: Update enrollment status to PAID
      const enrollmentResponse = await fetch(
        `http://localhost:8080/enrollments/${enrollmentId}/status/PAID`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (enrollmentResponse.status === 401) {
        throw new Error(
          "Your session has expired. Please login again."
        );
      }

      if (!enrollmentResponse.ok) {
        throw new Error(
          "Payment was successful, but enrollment status could not be updated."
        );
      }

      const enrollmentData = await enrollmentResponse.json();

      console.log(
        "Updated Enrollment:",
        enrollmentData
      );


      // Step 3: Show success
      setSuccess(true);

    } catch (err) {

      console.error(err);

      setError(err.message);

    } finally {

      setProcessing(false);

    }
  };


  return (

    <div className="payment-page">

      <section className="payment-header">

        <span className="payment-badge">
          TUITION PAYMENT
        </span>

        <h1>
          Complete Your Payment
        </h1>

        <p>
          Review your enrollment details and securely process
          your tuition payment.
        </p>

      </section>


      <section className="payment-card">

        <div className="payment-course">

          <div className="payment-course-icon">
            💳
          </div>

          <div>

            <span className="payment-course-code">
              {course.courseCode}
            </span>

            <h2>
              {course.courseName}
            </h2>

            <p>
              👤 Student ID: <strong>{studentId}</strong>
            </p>

          </div>

        </div>


        <div className="payment-divider"></div>


        <div className="payment-summary">

          <div className="summary-row">

            <span>
              Course
            </span>

            <strong>
              {course.courseName}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Instructor
            </span>

            <strong>
              {course.instructor}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Student ID
            </span>

            <strong>
              {studentId}
            </strong>

          </div>


          <div className="summary-total">

            <span>
              Total Tuition Fee
            </span>

            <strong>
              ₹{Number(course.tuitionFee).toLocaleString("en-IN")}
            </strong>

          </div>

        </div>


        {error && (
          <div className="payment-error">
            ⚠️ {error}
          </div>
        )}


        {success ? (

          <div className="payment-success">

            <div className="payment-success-icon">
              ✓
            </div>

            <h3>
              Payment Successful!
            </h3>

            <p>
              Your tuition payment has been processed successfully.
              Your course enrollment is now complete.
            </p>

            <button
              className="confirm-enrollment-button"
              onClick={() => navigate("/courses")}
            >
              Go to Courses →
            </button>

          </div>

        ) : (

          <>

            <div className="secure-payment">
              🔒 Secure Payment Processing
            </div>

            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing
                ? "Processing Payment..."
                : `Pay ₹${Number(course.tuitionFee).toLocaleString("en-IN")}`
              }
            </button>

            <button
              className="cancel-enrollment-button"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              Cancel
            </button>

          </>

        )}

      </section>

    </div>
  );
}

export default Payment;
