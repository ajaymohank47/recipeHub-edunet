import { useEffect, useState, useRef } from "react";
import { FaSearch, FaArrowDown, FaUtensils, FaClock, FaUsers } from "react-icons/fa";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const recipeSectionRef = useRef(null);

  const images = [
    "/assets/bg.jpg",
    "/assets/bg2.jpg", 
    "/assets/bg3.jpg",
  ];

  const stats = [
    { icon: FaUtensils, number: "500+", label: "Recipes" },
    { icon: FaClock, number: "24/7", label: "Available" },
    { icon: FaUsers, number: "1000+", label: "Happy Cooks" },
  ];

  // Fetch all recipes
  const fetchAllRecipes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/recipes`);
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
    setIsVisible(true);
  }, []);

  // Auto-slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    recipeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const title = recipe.name || "No Title";
    const categoryMatch = category === "All" || recipe.category === category;
    const typeMatch = type === "All" || recipe.type === type;
    const searchMatch = search === "" || title.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBackground}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                ...styles.slideImage,
                opacity: index === currentImageIndex ? 1 : 0,
                backgroundImage: `url(${image})`,
              }}
            />
          ))}
          <div style={styles.heroOverlay} />
        </div>

        <div style={styles.heroContent} className={isVisible ? "fade-in" : ""}>
          <h1 style={styles.heroTitle} className="slide-up">
            Discover Culinary
            <span style={styles.heroTitleAccent}> Excellence</span>
          </h1>
          <p style={styles.heroSubtitle} className="slide-up">
            Explore thousands of recipes from around the world, share your culinary creations, 
            and connect with fellow food enthusiasts.
          </p>
          
          <div style={styles.heroButtons} className="scale-in">
            <button style={styles.primaryBtn} onClick={handleExploreClick}>
              <FaArrowDown style={styles.btnIcon} />
              Explore Recipes
            </button>
          </div>

          {/* Stats Section */}
          <div style={styles.statsContainer} className="slide-up">
            {stats.map((stat, index) => (
              <div key={index} style={styles.statItem} className="float">
                <stat.icon style={styles.statIcon} />
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section style={styles.filtersSection} className="slide-up">
        <div style={styles.filtersContainer}>
          <h2 style={styles.filtersTitle}>Find Your Perfect Recipe</h2>
          
          <div style={styles.filtersGrid}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Category</label>
              <select 
                style={styles.filterSelect} 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Type</label>
              <select 
                style={styles.filterSelect} 
                value={type} 
                onChange={(e) => setType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Search</label>
              <div style={styles.searchContainer}>
                <FaSearch style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  style={styles.searchInput}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe List Section */}
      <section ref={recipeSectionRef} style={styles.recipesSection}>
        <div style={styles.recipesContainer}>
          <h2 style={styles.recipesTitle}>
            {search || category !== "All" || type !== "All" 
              ? `Found ${filteredRecipes.length} recipes` 
              : "All Recipes"}
          </h2>
          
          <div style={styles.recipeGrid}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <div 
                  key={recipe._id} 
                  style={{...styles.recipeCardWrapper, animationDelay: `${index * 0.1}s`}}
                  className="scale-in"
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))
            ) : (
              <div style={styles.noRecipes} className="fade-in">
                <FaUtensils style={styles.noRecipesIcon} />
                <h3>No recipes found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
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
    position: "relative",
    height: "70vh",
    minHeight: "500px",
    maxHeight: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  slideImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "opacity 2s ease-in-out",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(255, 107, 53, 0.8) 0%, rgba(247, 147, 30, 0.6) 100%)",
    zIndex: 2,
  },
  heroContent: {
    position: "relative",
    zIndex: 3,
    textAlign: "center",
    color: "white",
    maxWidth: "800px",
    padding: "0 2rem",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: "700",
    marginBottom: "1.5rem",
    lineHeight: "1.2",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  heroTitleAccent: {
    background: "linear-gradient(45deg, #fff, #f1f5f9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
    marginBottom: "2.5rem",
    opacity: 0.95,
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto 2.5rem",
  },
  heroButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "3rem",
  },
  primaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 2rem",
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  btnIcon: {
    fontSize: "1rem",
  },
  statsContainer: {
    display: "flex",
    gap: "3rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  statItem: {
    textAlign: "center",
    color: "white",
  },
  statIcon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
    opacity: 0.9,
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "0.25rem",
  },
  statLabel: {
    fontSize: "0.9rem",
    opacity: 0.8,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  // Filters Section
  filtersSection: {
    padding: "4rem 0",
    background: "var(--white)",
  },
  filtersContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  filtersTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "3rem",
    color: "var(--gray-800)",
  },
  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  filterLabel: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "var(--gray-700)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  filterSelect: {
    padding: "1rem",
    border: "2px solid var(--gray-200)",
    borderRadius: "var(--radius-lg)",
    fontSize: "1rem",
    background: "var(--white)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "1rem",
    color: "var(--gray-400)",
    zIndex: 2,
  },
  searchInput: {
    width: "100%",
    padding: "1rem 1rem 1rem 3rem",
    border: "2px solid var(--gray-200)",
    borderRadius: "var(--radius-lg)",
    fontSize: "1rem",
    background: "var(--white)",
    transition: "all var(--transition-fast)",
  },

  // Recipes Section
  recipesSection: {
    padding: "4rem 0",
    background: "var(--gray-50)",
    minHeight: "50vh",
  },
  recipesContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  recipesTitle: {
    fontSize: "2rem",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "3rem",
    color: "var(--gray-800)",
  },
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "2rem",
    alignItems: "start", // Align cards to top to prevent stretching
  },
  recipeCardWrapper: {
    opacity: 0,
    animation: "scaleIn 0.6s ease-out forwards",
  },
  noRecipes: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "4rem 2rem",
    color: "var(--gray-500)",
  },
  noRecipesIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
    opacity: 0.5,
  },
};

export default Home;
