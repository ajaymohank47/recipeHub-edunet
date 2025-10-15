import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaEye, FaUtensils, FaClock, FaUser } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserRecipes(); // ✅ Fixed function name
  }, [token, navigate]);

  const fetchUserRecipes = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://recipehub-backend-cx3k.onrender.com'}/api/recipes/user/recipes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // Handle Delete Recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    // Set the deletingId to disable the button
    setDeletingId(id);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://recipehub-backend-cx3k.onrender.com'}/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove the deleted recipe from the state
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } else {
        console.error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    } finally {
      // Reset deletingId to re-enable the button after deletion
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading your recipes...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header} className="fade-in">
        <div style={styles.headerContent}>
          <div style={styles.headerText}>
            <h1 style={styles.title}>My Recipe Collection</h1>
            <p style={styles.subtitle}>
              Manage and organize your delicious recipes
            </p>
          </div>
          <button
            style={styles.createButton}
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/create-recipe")}
          >
            <FaPlus style={styles.buttonIcon} />
            Create New Recipe
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard} className="card scale-in">
            <FaUtensils style={styles.statIcon} />
            <div style={styles.statNumber}>{recipes.length}</div>
            <div style={styles.statLabel}>Total Recipes</div>
          </div>
          <div style={styles.statCard} className="card scale-in">
            <FaClock style={styles.statIcon} />
            <div style={styles.statNumber}>
              {recipes.filter(r => r.category === "Breakfast").length}
            </div>
            <div style={styles.statLabel}>Breakfast</div>
          </div>
          <div style={styles.statCard} className="card scale-in">
            <FaUser style={styles.statIcon} />
            <div style={styles.statNumber}>
              {recipes.filter(r => r.category === "Dinner").length}
            </div>
            <div style={styles.statLabel}>Dinner</div>
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div style={styles.recipesSection}>
        {recipes.length === 0 ? (
          <div style={styles.emptyState} className="fade-in">
            <FaUtensils style={styles.emptyIcon} />
            <h3 style={styles.emptyTitle}>No recipes yet</h3>
            <p style={styles.emptyText}>
              Start building your recipe collection by creating your first recipe!
            </p>
            <button
              style={styles.emptyButton}
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/create-recipe")}
            >
              <FaPlus style={styles.buttonIcon} />
              Create Your First Recipe
            </button>
          </div>
        ) : (
          <div style={styles.recipesGrid}>
            {recipes.map((recipe, index) => (
              <div
                key={recipe._id}
                style={{ ...styles.recipeCard, animationDelay: `${index * 0.1}s` }}
                className="card scale-in"
              >
                <div style={styles.recipeImageContainer}>
                  <img
                    src={recipe.image || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={recipe.name}
                    style={styles.recipeImage}
                  />
                  <div style={styles.recipeCategory}>
                    {recipe.category}
                  </div>
                </div>

                <div style={styles.recipeContent}>
                  <h3 style={styles.recipeName}>{recipe.name}</h3>
                  <p style={styles.recipeDescription}>
                    {recipe.description || "No description available"}
                  </p>

                  <div style={styles.recipeActions}>
                    <button
                      style={styles.viewButton}
                      onClick={() => navigate(`/recipe/${recipe._id}`)}
                      className="btn btn-secondary"
                    >
                      <FaEye style={styles.buttonIcon} />
                      View
                    </button>

                    {deletingId === recipe._id ? (
                      <button
                        style={styles.deleteButtonLoading}
                        className="btn"
                        disabled
                      >
                        <div style={styles.buttonSpinner} />
                        Deleting...
                      </button>
                    ) : (
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(recipe._id)}
                        className="btn"
                      >
                        <FaTrash style={styles.buttonIcon} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "var(--gray-50)",
    paddingTop: "2rem",
  },

  // Loading State
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    gap: "1rem",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid var(--gray-200)",
    borderTop: "4px solid var(--primary)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "1.1rem",
    color: "var(--gray-600)",
  },

  // Header Section
  header: {
    background: "var(--white)",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "var(--shadow-sm)",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "var(--gray-800)",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "var(--gray-600)",
    margin: 0,
  },
  createButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    whiteSpace: "nowrap",
  },

  // Stats Section
  statsSection: {
    maxWidth: "1200px",
    margin: "0 auto 3rem",
    padding: "0 2rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  statCard: {
    background: "var(--white)",
    padding: "2rem 1.5rem",
    borderRadius: "var(--radius-lg)",
    textAlign: "center",
    transition: "all var(--transition-normal)",
  },
  statIcon: {
    fontSize: "2.5rem",
    color: "var(--primary)",
    marginBottom: "1rem",
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "var(--gray-800)",
    marginBottom: "0.5rem",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "var(--gray-600)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  // Recipes Section
  recipesSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem 3rem",
  },
  recipesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "2rem",
  },
  recipeCard: {
    background: "var(--white)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    transition: "all var(--transition-normal)",
    height: "450px", // Fixed height for all cards
    display: "flex",
    flexDirection: "column",
  },
  recipeImageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform var(--transition-normal)",
  },
  recipeCategory: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "var(--primary)",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "var(--radius-md)",
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  recipeContent: {
    padding: "1.5rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  recipeName: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "var(--gray-800)",
    marginBottom: "0.5rem",
    lineHeight: "1.3",
  },
  recipeDescription: {
    fontSize: "0.875rem",
    color: "var(--gray-600)",
    lineHeight: "1.5",
    marginBottom: "1.5rem",
    flex: 1,
    display: "-webkit-box",
    WebkitLineClamp: 3, // Allow 3 lines for better readability
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minHeight: "3.9rem", // Reserve space for 3 lines
  },
  recipeActions: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "auto",
  },
  viewButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    background: "var(--danger)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-md)",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  deleteButtonLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    background: "var(--gray-400)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-md)",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "not-allowed",
  },
  buttonIcon: {
    fontSize: "0.875rem",
  },
  buttonSpinner: {
    width: "14px",
    height: "14px",
    border: "2px solid transparent",
    borderTop: "2px solid currentColor",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "var(--white)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-sm)",
  },
  emptyIcon: {
    fontSize: "4rem",
    color: "var(--gray-300)",
    marginBottom: "1.5rem",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "var(--gray-700)",
    marginBottom: "0.5rem",
  },
  emptyText: {
    fontSize: "1rem",
    color: "var(--gray-500)",
    marginBottom: "2rem",
    maxWidth: "400px",
    margin: "0 auto 2rem",
    lineHeight: "1.6",
  },
  emptyButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
  },
};