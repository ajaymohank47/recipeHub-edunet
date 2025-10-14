import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaUtensils
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: FaTwitter, url: "#", label: "Twitter", color: "#1da1f2" },
    { icon: FaInstagram, url: "#", label: "Instagram", color: "#e4405f" },
    { icon: FaLinkedinIn, url: "#", label: "LinkedIn", color: "#0077b5" },
  ];

  return (
    <footer style={styles.footer}>
      {/* Main Footer Content */}
      <div style={styles.footerContent}>
        <div style={styles.container}>
          <div style={styles.footerGrid} className="footer-grid">
            
            {/* Brand Section */}
            <div style={styles.brandSection} className="fade-in footer-brand-section">
              <div style={styles.brandLogo}>
                <FaUtensils style={styles.logoIcon} />
                <h3 style={styles.brandName}>Recipe Hub</h3>
              </div>
              <p style={styles.brandDescription}>
                Professional recipe sharing platform for culinary enthusiasts and food professionals.
              </p>
              <div style={styles.socialLinks} className="footer-social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    style={{...styles.socialLink, backgroundColor: social.color}}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div style={styles.linksSection}>
              <h4 style={styles.sectionTitle}>Navigation</h4>
              <ul style={styles.linksList}>
                {quickLinks.map((link, index) => (
                  <li key={index} style={styles.linkItem}>
                    <button
                      style={styles.footerLink}
                      onClick={() => navigate(link.path)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div style={styles.contactSection}>
              <h4 style={styles.sectionTitle}>Contact</h4>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}>
                  <FaEnvelope style={styles.contactIcon} />
                  <span style={styles.contactText}>hello@recipehub.com</span>
                </div>
                <div style={styles.contactItem}>
                  <FaPhone style={styles.contactIcon} />
                  <span style={styles.contactText}>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={styles.footerBottom}>
        <div style={styles.container}>
          <div style={styles.bottomContent} className="footer-bottom-content">
            <div style={styles.copyright}>
              <p style={styles.copyrightText}>
                © {currentYear} Recipe Hub. All rights reserved.
              </p>
            </div>
            <div style={styles.bottomLinks}>
              <span style={styles.bottomLink}>Privacy Policy</span>
              <span style={styles.bottomDivider}>•</span>
              <span style={styles.bottomLink}>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)",
    color: "var(--gray-100)",
    marginTop: "auto",
  },

  // Main Footer Content
  footerContent: {
    padding: "4rem 0 2rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.5fr",
    gap: "3rem",
    alignItems: "start",
  },

  // Brand Section
  brandSection: {
    paddingRight: "2rem",
  },
  brandLogo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  logoIcon: {
    fontSize: "2rem",
    color: "var(--primary)",
  },
  brandName: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "var(--white)",
    margin: 0,
  },
  brandDescription: {
    fontSize: "0.875rem",
    lineHeight: "1.5",
    color: "var(--gray-300)",
    marginBottom: "1.5rem",
  },
  socialLinks: {
    display: "flex",
    gap: "1rem",
  },
  socialLink: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "all var(--transition-normal)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },

  // Links Section
  linksSection: {},
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "var(--white)",
    marginBottom: "1.5rem",
    position: "relative",
  },
  linksList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  linkItem: {
    marginBottom: "0.75rem",
  },
  footerLink: {
    color: "var(--gray-300)",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color var(--transition-fast)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  // Contact Section
  contactSection: {},
  contactInfo: {},
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.75rem",
  },
  contactIcon: {
    fontSize: "1rem",
    color: "var(--primary)",
    minWidth: "16px",
  },
  contactText: {
    fontSize: "0.875rem",
    color: "var(--gray-300)",
  },



  // Footer Bottom
  footerBottom: {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "1.5rem 0",
    background: "rgba(0, 0, 0, 0.2)",
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  copyright: {},
  copyrightText: {
    fontSize: "0.875rem",
    color: "var(--gray-400)",
    margin: 0,
  },
  bottomLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  bottomLink: {
    fontSize: "0.875rem",
    color: "var(--gray-400)",
    cursor: "pointer",
    transition: "color var(--transition-fast)",
  },
  bottomDivider: {
    color: "var(--gray-500)",
    fontSize: "0.875rem",
  },
};



export default Footer;