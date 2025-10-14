import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error(data.message || "An error occurred during signup.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, text: "" };
    if (password.length < 6) return { strength: 1, text: "Weak", color: "#e74c3c" };
    if (password.length < 8) return { strength: 2, text: "Fair", color: "#f39c12" };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 3, text: "Strong", color: "#27ae60" };
    }
    return { strength: 2, text: "Good", color: "#3498db" };
  };

  const passwordStrength = getPasswordStrength();

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard} className="scale-in">
          <div style={styles.successIcon}>
            <FaCheck />
          </div>
          <h2 style={styles.successTitle}>Account Created!</h2>
          <p style={styles.successText}>
            Welcome to Recipe Hub! Redirecting you to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.shape1}></div>
        <div style={styles.shape2}></div>
      </div>
      
      <div style={styles.signupCard} className="scale-in card-elevated">
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <FaUserPlus style={styles.headerIcon} />
          </div>
          <h1 style={styles.title}>Join Recipe Hub</h1>
          <p style={styles.subtitle}>Create your account and start cooking!</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <div style={styles.inputContainer}>
              <FaUser style={styles.inputIcon} />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                className="input"
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
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
            
            {formData.password && (
              <div style={styles.passwordStrength}>
                <div style={styles.strengthBar}>
                  <div 
                    style={{
                      ...styles.strengthFill,
                      width: `${(passwordStrength.strength / 3) * 100}%`,
                      background: passwordStrength.color
                    }}
                  />
                </div>
                <span style={{...styles.strengthText, color: passwordStrength.color}}>
                  {passwordStrength.text}
                </span>
              </div>
            )}
          </div>

          {error && (
            <div style={styles.errorMessage} className="fade-in">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            style={styles.signupButton}
            className="btn btn-primary btn-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div style={styles.spinner} />
                Creating Account...
              </>
            ) : (
              <>
                <FaUserPlus style={styles.buttonIcon} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account?{" "}
            <span 
              style={styles.link} 
              onClick={() => navigate("/login")}
            >
              Sign in here
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
    top: "-30%",
    left: "-20%",
    width: "500px",
    height: "500px",
    background: "linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%)",
    borderRadius: "50%",
    opacity: 0.1,
    animation: "float 8s ease-in-out infinite",
  },
  shape2: {
    position: "absolute",
    bottom: "-30%",
    right: "-20%",
    width: "400px",
    height: "400px",
    background: "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
    borderRadius: "50%",
    opacity: 0.1,
    animation: "float 6s ease-in-out infinite reverse",
  },
  signupCard: {
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
  passwordStrength: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },
  strengthBar: {
    flex: 1,
    height: "4px",
    background: "var(--gray-200)",
    borderRadius: "2px",
    overflow: "hidden",
  },
  strengthFill: {
    height: "100%",
    transition: "all var(--transition-normal)",
    borderRadius: "2px",
  },
  strengthText: {
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
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
  signupButton: {
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
  
  // Success Card
  successCard: {
    position: "relative",
    zIndex: 2,
    background: "var(--white)",
    borderRadius: "var(--radius-2xl)",
    padding: "3rem 2.5rem",
    width: "100%",
    maxWidth: "400px",
    margin: "2rem",
    boxShadow: "var(--shadow-2xl)",
    textAlign: "center",
  },
  successIcon: {
    width: "80px",
    height: "80px",
    background: "var(--success)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    fontSize: "2rem",
    color: "white",
    boxShadow: "var(--shadow-lg)",
  },
  successTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "var(--gray-800)",
    marginBottom: "1rem",
  },
  successText: {
    fontSize: "1rem",
    color: "var(--gray-600)",
    lineHeight: "1.6",
  },
};

export default Signup;
