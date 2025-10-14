import React from "react";
import { FaUtensils, FaUsers, FaHeart, FaGlobe, FaAward, FaClock, FaLeaf, FaBook } from "react-icons/fa";

function About() {
  const features = [
    {
      icon: FaUtensils,
      title: "Diverse Recipes",
      description: "From comfort food to gourmet cuisine, discover recipes from every corner of the world."
    },
    {
      icon: FaUsers,
      title: "Community Driven",
      description: "Join thousands of passionate cooks sharing their culinary adventures and expertise."
    },
    {
      icon: FaHeart,
      title: "Made with Love",
      description: "Every recipe is crafted with care and tested by our community of food enthusiasts."
    },
    {
      icon: FaGlobe,
      title: "Global Flavors",
      description: "Explore authentic dishes from different cultures and expand your culinary horizons."
    }
  ];

  const stats = [
    { icon: FaBook, number: "1000+", label: "Recipes" },
    { icon: FaUsers, number: "5000+", label: "Active Users" },
    { icon: FaAward, number: "50+", label: "Featured Chefs" },
    { icon: FaClock, number: "24/7", label: "Support" }
  ];

  const values = [
    {
      icon: FaLeaf,
      title: "Sustainability",
      description: "We promote sustainable cooking practices and seasonal ingredients to protect our planet."
    },
    {
      icon: FaHeart,
      title: "Inclusivity",
      description: "Our platform welcomes cooks of all skill levels, dietary preferences, and cultural backgrounds."
    },
    {
      icon: FaUsers,
      title: "Community",
      description: "We believe in the power of sharing knowledge and building connections through food."
    }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero} className="fade-in">
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle} className="slide-up">
            About Recipe Hub
          </h1>
          <p style={styles.heroSubtitle} className="slide-up">
            Where culinary passion meets community. Discover, create, and share 
            the joy of cooking with food lovers from around the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={styles.missionSection}>
        <div style={styles.missionContent}>
          <div style={styles.missionText} className="slide-in-left">
            <h2 style={styles.sectionTitle}>Our Mission</h2>
            <p style={styles.missionDescription}>
              At Recipe Hub, we're on a mission to democratize cooking and make delicious, 
              homemade meals accessible to everyone. We believe that cooking is more than 
              just preparing food – it's about creating memories, sharing culture, and 
              bringing people together around the table.
            </p>
            <p style={styles.missionDescription}>
              Whether you're a beginner looking for simple weeknight dinners or an 
              experienced chef seeking inspiration for your next culinary masterpiece, 
              our platform provides the tools, community, and resources you need to 
              succeed in the kitchen.
            </p>
          </div>
          <div style={styles.missionImage} className="slide-in-right">
            <div style={styles.imagePlaceholder}>
              <FaUtensils style={styles.placeholderIcon} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresContainer}>
          <h2 style={styles.sectionTitle} className="fade-in">What Makes Us Special</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                style={styles.featureCard} 
                className="scale-in card"
              >
                <div style={styles.featureIcon}>
                  <feature.icon />
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <h2 style={styles.statsTitle} className="fade-in">Recipe Hub by the Numbers</h2>
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                style={styles.statCard} 
                className="float"
              >
                <stat.icon style={styles.statIcon} />
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.valuesContainer}>
          <h2 style={styles.sectionTitle} className="fade-in">Our Values</h2>
          <div style={styles.valuesGrid}>
            {values.map((value, index) => (
              <div 
                key={index} 
                style={styles.valueCard} 
                className="slide-up card"
              >
                <div style={styles.valueIcon}>
                  <value.icon />
                </div>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent} className="scale-in">
          <h2 style={styles.ctaTitle}>Ready to Start Cooking?</h2>
          <p style={styles.ctaDescription}>
            Join our community of passionate cooks and start your culinary journey today!
          </p>
          <div style={styles.ctaButtons}>
            <button style={styles.primaryButton} className="btn btn-primary btn-lg">
              Browse Recipes
            </button>
            <button style={styles.secondaryButton} className="btn btn-secondary btn-lg">
              Join Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

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

  // Mission Section
  missionSection: {
    padding: "5rem 2rem",
    background: "var(--white)",
  },
  missionContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "center",
  },
  missionText: {
    paddingRight: "2rem",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "var(--gray-800)",
  },
  missionDescription: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    marginBottom: "1.5rem",
    color: "var(--gray-600)",
  },
  missionImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: "300px",
    height: "300px",
    background: "linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-xl)",
  },
  placeholderIcon: {
    fontSize: "6rem",
    color: "white",
    opacity: 0.8,
  },

  // Features Section
  featuresSection: {
    padding: "5rem 2rem",
    background: "var(--gray-50)",
  },
  featuresContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginTop: "3rem",
    maxWidth: "1000px",
    margin: "3rem auto 0",
  },
  featureCard: {
    background: "var(--white)",
    padding: "2rem 1.5rem",
    borderRadius: "var(--radius-lg)",
    textAlign: "center",
    transition: "all var(--transition-normal)",
    height: "100%",
  },
  featureIcon: {
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
  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "var(--gray-800)",
  },
  featureDescription: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "var(--gray-600)",
  },

  // Stats Section
  statsSection: {
    padding: "5rem 2rem",
    background: "var(--gray-800)",
    color: "white",
  },
  statsContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  statsTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "3rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
  },
  statCard: {
    textAlign: "center",
    padding: "2rem 1rem",
  },
  statIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "var(--primary)",
  },
  statNumber: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
  },
  statLabel: {
    fontSize: "1rem",
    opacity: 0.8,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  // Values Section
  valuesSection: {
    padding: "5rem 2rem",
    background: "var(--white)",
  },
  valuesContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "3rem",
    maxWidth: "900px",
    margin: "3rem auto 0",
  },
  valueCard: {
    background: "var(--gray-50)",
    padding: "2rem 1.5rem",
    borderRadius: "var(--radius-lg)",
    textAlign: "center",
    transition: "all var(--transition-normal)",
    height: "100%",
  },
  valueIcon: {
    width: "70px",
    height: "70px",
    background: "var(--primary)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    fontSize: "1.75rem",
    color: "white",
  },
  valueTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "var(--gray-800)",
  },
  valueDescription: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "var(--gray-600)",
  },

  // CTA Section
  ctaSection: {
    padding: "5rem 2rem",
    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
    color: "white",
    textAlign: "center",
  },
  ctaContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  ctaDescription: {
    fontSize: "1.1rem",
    marginBottom: "2.5rem",
    opacity: 0.9,
    lineHeight: "1.6",
  },
  ctaButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryButton: {
    background: "white",
    color: "var(--primary)",
    border: "2px solid white",
  },
  secondaryButton: {
    background: "transparent",
    color: "white",
    border: "2px solid white",
  },
};

export default About;
