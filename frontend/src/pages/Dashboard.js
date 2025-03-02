import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [deletingId, setDeletingId] = useState(null); // Track which recipe is being deleted
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
      const token = localStorage.getItem("token"); // Get auth token
  
      const response = await fetch("http://localhost:5000/api/recipes/user/recipes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched user recipes:", data);
      setRecipes(data); // Update state with fetched recipes
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };
  

  // Handle Delete Recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    // Set the deletingId to disable the button
    setDeletingId(id);

    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-center">No recipes found. Start adding some!</p>
      ) : (
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div
                className="card shadow-lg"
                style={{
                  width: "100%",
                  height: "260px", // Increase height for bigger cards
                  padding: "30px",  // More padding for a bigger card
                  borderRadius: "15px", // Rounded corners
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={recipe.image || "https://via.placeholder.com/150"}
                    alt={recipe.name}
                    className="rounded-circle me-3"
                    style={{
                      width: "120px",  // Increased image size
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <h5 className="mb-1" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      {recipe.name}
                    </h5>
                    <small className="text-muted" style={{ fontSize: "1rem" }}>
                      {recipe.category}
                    </small>
                  </div>
                </div>

                {/* Conditionally render button */}
                {deletingId === recipe._id ? (
                  <button
                    className="btn btn-danger btn-sm disabled"
                    disabled
                  >
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Deleting...</span>
                    </div> Deleting
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
