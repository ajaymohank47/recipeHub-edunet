import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaInfoCircle, FaTachometerAlt, FaPlus, FaSignOutAlt, FaUserPlus, FaSignInAlt, FaBars, FaTimes, FaPhone } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = token ? [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/about", label: "About", icon: FaInfoCircle },
    { path: "/contact", label: "Contact", icon: FaPhone },
    { path: "/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { path: "/create-recipe", label: "Create Recipe", icon: FaPlus },
  ] : [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/about", label: "About", icon: FaInfoCircle },
    { path: "/contact", label: "Contact", icon: FaPhone },
  ];

  return (
    <nav style={{
      ...styles.navbar,
      background: isScrolled 
        ? "rgba(255, 255, 255, 0.95)" 
        : "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
      backdropFilter: isScrolled ? "blur(20px)" : "none",
      boxShadow: isScrolled 
        ? "0 8px 32px rgba(0, 0, 0, 0.1)" 
        : "0 4px 20px rgba(255, 107, 53, 0.3)",
    }}>
      <div style={styles.container}>
        <div 
          style={{
            ...styles.logo,
            color: isScrolled ? "#ff6b35" : "#fff"
          }}
          onClick={() => handleNavigation("/")}
        >
          🍳 Recipe Hub
        </div>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav} className="desktop-nav">
          <div style={styles.navLinks}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  style={{
                    ...styles.navButton,
                    background: isActive(item.path) 
                      ? (isScrolled ? "#ff6b35" : "rgba(255, 255, 255, 0.3)")
                      : (hoveredButton === item.path 
                          ? (isScrolled ? "rgba(255, 107, 53, 0.1)" : "rgba(255, 255, 255, 0.2)")
                          : "transparent"),
                    color: isActive(item.path) 
                      ? (isScrolled ? "#fff" : "#fff")
                      : (isScrolled ? "#475569" : "#fff"),
                  }}
                  onClick={() => handleNavigation(item.path)}
                  onMouseEnter={() => setHoveredButton(item.path)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Icon style={styles.icon} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div style={styles.authButtons}>
            {token ? (
              <button
                style={{
                  ...styles.logoutButton,
                  background: isScrolled ? "#e74c3c" : "rgba(231, 76, 60, 0.9)",
                }}
                onClick={handleLogout}
                onMouseEnter={() => setHoveredButton("logout")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <FaSignOutAlt style={styles.icon} />
                Logout
              </button>
            ) : (
              <>
                <button
                  style={{
                    ...styles.authButton,
                    background: isScrolled ? "transparent" : "rgba(255, 255, 255, 0.2)",
                    color: isScrolled ? "#475569" : "#fff",
                    border: isScrolled ? "1px solid #cbd5e1" : "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                  onClick={() => handleNavigation("/signup")}
                >
                  <FaUserPlus style={styles.icon} />
                  Sign Up
                </button>
                <button
                  style={{
                    ...styles.authButton,
                    background: isScrolled ? "#ff6b35" : "rgba(255, 255, 255, 0.9)",
                    color: isScrolled ? "#fff" : "#ff6b35",
                  }}
                  onClick={() => handleNavigation("/login")}
                >
                  <FaSignInAlt style={styles.icon} />
                  Login
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{
            ...styles.mobileMenuButton,
            color: isScrolled ? "#ff6b35" : "#fff"
          }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div style={styles.mobileNav}>
          <div style={styles.mobileNavContent}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  style={{
                    ...styles.mobileNavButton,
                    background: isActive(item.path) ? "#ff6b35" : "transparent",
                    color: isActive(item.path) ? "#fff" : "#475569",
                  }}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon style={styles.icon} />
                  {item.label}
                </button>
              );
            })}
            
            <div style={styles.mobileAuthButtons}>
              {token ? (
                <button
                  style={styles.mobileLogoutButton}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt style={styles.icon} />
                  Logout
                </button>
              ) : (
                <>
                  <button
                    style={styles.mobileAuthButton}
                    onClick={() => handleNavigation("/signup")}
                  >
                    <FaUserPlus style={styles.icon} />
                    Sign Up
                  </button>
                  <button
                    style={{...styles.mobileAuthButton, background: "#ff6b35", color: "#fff"}}
                    onClick={() => handleNavigation("/login")}
                  >
                    <FaSignInAlt style={styles.icon} />
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1.5rem",
    height: "70px",
  },
  logo: {
    fontSize: "1.75rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    letterSpacing: "-0.025em",
  },
  desktopNav: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  navLinks: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    textDecoration: "none",
  },
  authButtons: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  },
  authButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1.25rem",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "2rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1.25rem",
    border: "none",
    borderRadius: "2rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#fff",
    transition: "all 0.2s ease",
  },
  icon: {
    fontSize: "0.875rem",
  },
  mobileMenuButton: {
    display: "none",
    background: "none",
    border: "none",
    fontSize: "1.25rem",
    cursor: "pointer",
    padding: "0.5rem",
  },
  mobileNav: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  mobileNavContent: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  mobileNavButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    textAlign: "left",
  },
  mobileAuthButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e2e8f0",
  },
  mobileAuthButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    border: "1px solid #cbd5e1",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    background: "transparent",
    color: "#475569",
    transition: "all 0.2s ease",
  },
  mobileLogoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    background: "#e74c3c",
    color: "#fff",
    transition: "all 0.2s ease",
  },
};

export default Navbar;