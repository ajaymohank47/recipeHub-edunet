import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const loginData = {
      email: formData.email,
      password: formData.password.toString(),
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.shape1}></div>
        <div style={styles.shape2}></div>
      </div>
      
      <div style={styles.loginCard} className="scale-in card-elevated">
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <FaSignInAlt style={styles.headerIcon} />
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your Recipe Hub account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <div style={styles.inputContainer}>
              <FaEnvelope style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                className="input"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputContainer}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                className="input"
                required
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.errorMessage} className="fade-in">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            style={styles.loginButton}
            className="btn btn-primary btn-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div style={styles.spinner} />
                Signing In...
              </>
            ) : (
              <>
                <FaSignInAlt style={styles.buttonIcon} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account?{" "}
            <span 
              style={styles.link} 
              onClick={() => navigate("/signup")}
            >
              Create one here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%)",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  shape1: {
    position: "absolute",
    top: "-50%",
    right: "-20%",
    width: "600px",
    height: "600px",
    background: "linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%)",
    borderRadius: "50%",
    opacity: 0.1,
    animation: "float 6s ease-in-out infinite",
  },
  shape2: {
    position: "absolute",
    bottom: "-50%",
    left: "-20%",
    width: "400px",
    height: "400px",
    background: "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
    borderRadius: "50%",
    opacity: 0.1,
    animation: "float 8s ease-in-out infinite reverse",
  },
  loginCard: {
    position: "relative",
    zIndex: 2,
    background: "var(--white)",
    borderRadius: "var(--radius-2xl)",
    padding: "3rem 2.5rem",
    width: "100%",
    maxWidth: "450px",
    margin: "2rem",
    boxShadow: "var(--shadow-2xl)",
  },
  header: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  iconContainer: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    boxShadow: "var(--shadow-lg)",
  },
  headerIcon: {
    fontSize: "2rem",
    color: "white",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "var(--gray-800)",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "var(--gray-600)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "1rem",
    color: "var(--gray-400)",
    fontSize: "1rem",
    zIndex: 2,
  },
  input: {
    width: "100%",
    padding: "1rem 1rem 1rem 3rem",
    border: "2px solid var(--gray-200)",
    borderRadius: "var(--radius-lg)",
    fontSize: "1rem",
    transition: "all var(--transition-fast)",
    background: "var(--white)",
  },
  passwordToggle: {
    position: "absolute",
    right: "1rem",
    background: "none",
    border: "none",
    color: "var(--gray-400)",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "0.5rem",
    zIndex: 2,
  },
  errorMessage: {
    padding: "1rem",
    background: "rgba(231, 76, 60, 0.1)",
    color: "var(--danger)",
    borderRadius: "var(--radius-md)",
    fontSize: "0.875rem",
    textAlign: "center",
    border: "1px solid rgba(231, 76, 60, 0.2)",
  },
  loginButton: {
    width: "100%",
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    position: "relative",
  },
  buttonIcon: {
    fontSize: "1rem",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid currentColor",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
    paddingTop: "2rem",
    borderTop: "1px solid var(--gray-200)",
  },
  footerText: {
    fontSize: "0.875rem",
    color: "var(--gray-600)",
  },
  link: {
    color: "var(--primary)",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color var(--transition-fast)",
  },
};

export default Login;

