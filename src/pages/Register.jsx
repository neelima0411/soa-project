import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setError("");
  };


  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          "Registration failed. Username or email may already exist."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      console.error(err);
      setError(err.message);

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="login-page">

      <section className="login-brand">

        <div className="brand-content">

          <div className="brand-logo">
            🎓
          </div>

          <span className="brand-tag">
            HIGHER EDUCATION PORTAL
          </span>

          <h1>
            Start Your Academic
            <br />
            Journey Today.
          </h1>

          <p>
            Create your account to explore courses,
            manage enrollment, and process tuition
            payments through one secure platform.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <span>✓</span>

              <div>
                <strong>
                  Personalized Account
                </strong>

                <p>
                  Create your own secure account.
                </p>
              </div>
            </div>

            <div className="login-feature">
              <span>✓</span>

              <div>
                <strong>
                  Course Enrollment
                </strong>

                <p>
                  Register for available courses.
                </p>
              </div>
            </div>

            <div className="login-feature">
              <span>✓</span>

              <div>
                <strong>
                  Secure Authentication
                </strong>

                <p>
                  Your password is securely protected.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>


      <section className="login-form-section">

        <div className="login-card">

          <div className="login-header">

            <div className="mobile-login-logo">
              🎓
            </div>

            <span className="login-small-title">
              CREATE ACCOUNT
            </span>

            <h2>
              Create your account
            </h2>

            <p>
              Enter your details to get started.
            </p>

          </div>


          <form onSubmit={handleRegister}>

            <div className="role-selection">

              <button
                type="button"
                className={
                  formData.role === "STUDENT"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "STUDENT"
                  })
                }
              >
                🎓 Student
              </button>

              <button
                type="button"
                className={
                  formData.role === "INSTRUCTOR"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "INSTRUCTOR"
                  })
                }
              >
                👨‍🏫 Instructor
              </button>

            </div>


            <div className="input-group">

              <label>
                Username
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  type="text"
                  name="username"
                  placeholder="Create a username"
                  value={formData.username}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="input-group">

              <label>
                Email
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉️
                </span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="input-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="input-group">

              <label>
                Confirm Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔐
                </span>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>

            </div>


            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}


            {success && (
              <div className="enrollment-success">
                ✅ {success}
              </div>
            )}


            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"
              }
            </button>


            <div className="login-security">
              🔐 Your password is securely encrypted
              before being stored.
            </div>

          </form>


          <div className="login-footer">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Register;