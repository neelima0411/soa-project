import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "STUDENT"
  });

  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setError("");
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!formData.username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (!captchaChecked) {
      setError("Please confirm that you are not a robot.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        }
      );

      if (!response.ok) {

        if (response.status === 401) {
          throw new Error(
            "Invalid username or password."
          );
        }

        throw new Error(
          "Login failed. Please try again."
        );
      }

      const token = await response.text();

      // Store JWT token in browser
      localStorage.setItem("jwtToken", token);

      // Store basic user information
      localStorage.setItem(
        "username",
        formData.username
      );

      localStorage.setItem(
        "role",
        formData.role
      );

      // Go to dashboard
      navigate("/dashboard");

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
            Your Academic
            <br />
            Journey Starts Here.
          </h1>

          <p>
            Access courses, manage your enrollment,
            and process tuition payments through one
            secure academic platform.
          </p>

          <div className="login-features">

            <div className="login-feature">

              <span>✓</span>

              <div>
                <strong>
                  Explore Courses
                </strong>

                <p>
                  Discover available academic programs.
                </p>
              </div>

            </div>


            <div className="login-feature">

              <span>✓</span>

              <div>
                <strong>
                  Easy Enrollment
                </strong>

                <p>
                  Register for courses with ease.
                </p>
              </div>

            </div>


            <div className="login-feature">

              <span>✓</span>

              <div>
                <strong>
                  Secure Payments
                </strong>

                <p>
                  Process tuition payments securely.
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
              WELCOME BACK
            </span>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Enter your credentials to continue.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

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
                  placeholder="Enter your username"
                  value={formData.username}
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>


            <div className="captcha-box">

              <div className="captcha-check">

                <input
                  type="checkbox"
                  id="captcha"
                  checked={captchaChecked}
                  onChange={(e) =>
                    setCaptchaChecked(
                      e.target.checked
                    )
                  }
                />

                <label htmlFor="captcha">
                  I'm not a robot
                </label>

              </div>

              <div className="captcha-brand">

                <span>
                  🛡️
                </span>

                <small>
                  CAPTCHA
                </small>

              </div>

            </div>


            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}


            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In →"
              }
            </button>


            <div className="login-security">

              🔐 Your account information is protected
              by secure authentication.

            </div>

          </form>


          <div className="login-footer">

            <span>
              Don't have an account?
            </span>
                
                <button
                 type="button"
                 onClick={() => navigate("/register")}
                >
              Create Account
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;