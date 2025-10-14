import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare form data for Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "c484a523-1016-4f9c-bcd5-7b6252c20771");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("from_name", "Recipe Hub Contact Form");
      
      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      content: "hello@recipehub.com",
      description: "Send us an email anytime!"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      content: "123 Recipe Street, Food City, FC 12345",
      description: "Come say hello at our office"
    }
  ];

  const socialLinks = [
    { icon: FaGithub, url: "#", label: "GitHub" },
    { icon: FaLinkedin, url: "#", label: "LinkedIn" },
    { icon: FaTwitter, url: "#", label: "Twitter" }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero} className="fade-in">
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle} className="slide-up">Get In Touch</h1>
          <p style={styles.heroSubtitle} className="slide-up">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={styles.contactInfoSection}>
        <div style={styles.contactInfoGrid}>
          {contactInfo.map((info, index) => (
            <div 
              key={index} 
              style={styles.contactCard} 
              className="scale-in card"
            >
              <div style={styles.contactIcon}>
                <info.icon />
              </div>
              <h3 style={styles.contactTitle}>{info.title}</h3>
              <p style={styles.contactContent}>{info.content}</p>
              <p style={styles.contactDescription}>{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={styles.formSection}>
        <div style={styles.formContainer}>
          <div style={styles.formContent} className="grid-responsive">
            <div style={styles.formHeader} className="slide-in-left">
              <h2 style={styles.formTitle}>Send us a Message</h2>
              <p style={styles.formSubtitle}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form} className="slide-in-right">
              {/* Honeypot field for spam protection */}
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />
              
              <div style={styles.formRow} className="contact-form-row">
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    className="input"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                  className="input"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  style={styles.textarea}
                  className="input"
                  required
                />
              </div>

              <button 
                type="submit" 
                style={styles.submitButton}
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div style={styles.spinner} />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane style={styles.buttonIcon} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div style={styles.successMessage} className="fade-in">
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon!
                </div>
              )}

              {submitStatus === "error" && (
                <div style={styles.errorMessage} className="fade-in">
                  ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section style={styles.socialSection}>
        <div style={styles.socialContainer}>
          <h3 style={styles.socialTitle}>Follow Us</h3>
          <div style={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                style={styles.socialLink}
                className="scale-in"
                aria-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
  },

  // Hero Section
  hero: {
    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
    color: "white",
    padding: "4rem 2rem 3rem",
    textAlign: "center",
    minHeight: "40vh",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "700",
    marginBottom: "1.5rem",
    lineHeight: "1.2",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
    opacity: 0.9,
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto",
  },

  // Contact Info Section
  contactInfoSection: {
    padding: "4rem 2rem",
    background: "var(--gray-50)",
  },
  contactInfoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  contactCard: {
    background: "var(--white)",
    padding: "2rem 1.5rem",
    borderRadius: "var(--radius-lg)",
    textAlign: "center",
    transition: "all var(--transition-normal)",
    height: "100%",
  },
  contactIcon: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    fontSize: "2rem",
    color: "white",
  },
  contactTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "var(--gray-800)",
  },
  contactContent: {
    fontSize: "1.1rem",
    fontWeight: "500",
    marginBottom: "0.5rem",
    color: "var(--primary)",
  },
  contactDescription: {
    fontSize: "0.9rem",
    color: "var(--gray-600)",
  },

  // Form Section
  formSection: {
    padding: "4rem 2rem",
    background: "var(--white)",
  },
  formContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  formContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "3rem",
    alignItems: "start",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "2rem",
    },
  },
  formHeader: {
    paddingRight: "2rem",
  },
  formTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "var(--gray-800)",
  },
  formSubtitle: {
    fontSize: "1.1rem",
    color: "var(--gray-600)",
    lineHeight: "1.6",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "var(--gray-700)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "2px solid var(--gray-200)",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    background: "var(--white)",
    transition: "all var(--transition-fast)",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "2px solid var(--gray-200)",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    background: "var(--white)",
    resize: "vertical",
    minHeight: "120px",
    fontFamily: "inherit",
    transition: "all var(--transition-fast)",
    outline: "none",
  },
  submitButton: {
    alignSelf: "flex-start",
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
  successMessage: {
    padding: "1rem",
    background: "var(--success)",
    color: "white",
    borderRadius: "var(--radius-md)",
    textAlign: "center",
    fontWeight: "500",
  },
  errorMessage: {
    padding: "1rem",
    background: "var(--danger)",
    color: "white",
    borderRadius: "var(--radius-md)",
    textAlign: "center",
    fontWeight: "500",
  },

  // Social Section
  socialSection: {
    padding: "3rem 2rem",
    background: "var(--gray-800)",
    color: "white",
    textAlign: "center",
  },
  socialContainer: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  socialTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "2rem",
  },
  socialLinks: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
  },
  socialLink: {
    width: "50px",
    height: "50px",
    background: "var(--primary)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.25rem",
    textDecoration: "none",
    transition: "all var(--transition-normal)",
  },
};

// Add keyframes for spinner
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject spinner animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = spinKeyframes;
  document.head.appendChild(styleSheet);
}

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    .grid-responsive {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }
    
    .contact-form-row {
      grid-template-columns: 1fr !important;
    }
  }
`;

// Inject responsive styles
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('contact-responsive-styles');
  if (!existingStyle) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'contact-responsive-styles';
    styleSheet.innerText = responsiveStyles;
    document.head.appendChild(styleSheet);
  }
}

export default Contact;