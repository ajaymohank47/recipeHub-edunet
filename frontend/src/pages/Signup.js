import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Signup Response:", data);
      if (response.ok) {
        navigate("/login");
      } else {
        throw new Error(data.message || "An error occurred during signup.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.text}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f9f9f9",
    animation: "fadeIn 1s ease-in-out",
  },
  card: {
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 11px 50px rgb(255, 119, 0)", 
    textAlign: "center",
    width: "350px",
    animation: "fadeInUp 1s ease-out",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    transition: "border-color 0.3s",
  },
  inputFocus: {
    borderColor: "#ff7500",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    background: "#ff7500",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s, transform 0.2s",
  },
  buttonHover: {
    backgroundColor: "#e66700", 
    transform: "scale(1.05)",
  },
  text: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#333",
  },
  link: {
    color: "#ff7500",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
};

// Animations for fade-in and slide-up effects
const fadeInUp = {
  '@keyframes fadeInUp': {
    '0%': {
      opacity: '0',
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    },
  }
};

export default Signup;
