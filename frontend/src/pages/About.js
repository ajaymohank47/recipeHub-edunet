import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={styles.container}
    >
      <motion.h1 
        style={styles.title}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        About Recipe Hub
      </motion.h1>
      
      <motion.p style={styles.text} whileHover={{ scale: 1.02 }}>
        Welcome to <strong>Recipe Hub</strong> – your ultimate destination for discovering, sharing, and enjoying delicious recipes from around the world.
      </motion.p>
      
      <motion.h2 style={styles.subtitle} whileHover={{ scale: 1.1 }}>Our Mission</motion.h2>
      <p style={styles.text}>
        At Recipe Hub, our mission is to inspire culinary creativity by bringing together people of all backgrounds to share their love for food. Whether you're a seasoned chef or just starting out in the kitchen, our platform is designed to make cooking fun, accessible, and inclusive. We believe food has the power to connect people, foster creativity, and bring joy to everyday life.
      </p>
      
      <motion.ul style={styles.list}>
        <motion.li whileHover={{ scale: 1.05 }}> A vibrant community of passionate home cooks and professional chefs.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}> A platform to discover new flavors, cooking techniques, and seasonal ingredients.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}> A space for creativity and collaboration, where everyone can contribute and learn.</motion.li>
      </motion.ul>
      
      <motion.h2 style={styles.subtitle} whileHover={{ scale: 1.1 }}>What We Offer</motion.h2>
      <motion.ul style={styles.list}>
        <motion.li whileHover={{ scale: 1.05 }}><strong>A Wide Selection of Recipes</strong> – From easy weeknight dinners to gourmet masterpieces, we have something for every occasion.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}><strong>Customizable Dietary Options</strong> – Whether you're looking for vegan, gluten-free, or keto-friendly meals, we've got you covered.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}><strong>Simple Step-by-Step Instructions</strong> – Our user-friendly guides ensure that you can easily follow along, no matter your cooking experience.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}><strong>A Thriving Community</strong> – Share your creations, exchange ideas, and join a network of food lovers from around the globe.</motion.li>
      </motion.ul>

      <motion.h2 style={styles.subtitle} whileHover={{ scale: 1.1 }}>Join Our Community</motion.h2>
      <p style={styles.text}>
        Whether you're looking for a quick meal, a special dessert, or a festive feast, Recipe Hub is here to make your culinary journey exciting.
      </p>
      
      <motion.p style={styles.contact} whileHover={{ scale: 1.05 }}>
        <strong>📩 Get in Touch:</strong> Contact us at <a href="mailto:support@recipehub.com">support@recipehub.com</a>
      </motion.p>
    </motion.div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "auto",
    padding: "40px",
    background: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: "38px",
    fontWeight: "bold",
    color: "#FF7500", // Updated color
  },
  subtitle: {
    fontSize: "26px",
    fontWeight: "bold",
    marginTop: "20px",
    color: "#333",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "20px",
    color: "#444",
  },
  list: {
    textAlign: "left",
    fontSize: "18px",
    lineHeight: "1.8",
    paddingLeft: "20px",
    color: "#666",
  },
  contact: {
    fontSize: "18px",
    marginTop: "20px",
    color: "#007bff",
  },
};

export default About;
