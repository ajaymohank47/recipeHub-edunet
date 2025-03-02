// Updated Login Component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password.toString(), // Ensure password is always a string
    };

    console.log("🔹 Sending Login Data:", loginData); // Debugging

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      console.log("🔍 Response Data:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("🚨 Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.text}>
          Don't have an account? <span style={styles.link} onClick={() => navigate("/signup")}>Sign Up</span>
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
    animation: "fadeIn 1s ease-in-out"
  },
  card: { 
    padding: "30px", 
    borderRadius: "10px", 
    background: "#fff", 
    boxShadow: "0px 11px 50px rgb(255, 119, 0)", 
    textAlign: "center", 
    width: "350px", 
    animation: "fadeInUp 1s ease-out"
  },
  title: { 
    fontSize: "24px", 
    marginBottom: "20px", 
    fontWeight: "bold", 
    color: "#333"
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
    color: "#333"
  },
  link: { 
    color: "#ff7500", 
    fontWeight: "bold", 
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;

