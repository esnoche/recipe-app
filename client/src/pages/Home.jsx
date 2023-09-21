import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const load = await axios.get("http://localhost:3001/recipes");
        setRecipes(load.data);
        // console.log(load.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSavedRecipes = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/recipes/saved-recipes/ids/${userId}`);
        setSavedRecipes(result.data.savedRecipes);
      } catch (error) {

      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);
  const saveRecipe = async (recipeId) => {
    try {
      const result = await axios.put("http://localhost:3001/recipes", { recipeId, userId });
      setSavedRecipes(result.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };
  const isRecipeSaved = (id) => savedRecipes.includes(id);
  return (
    <>
      <h2>Recipes</h2>
      <ul>
        {
          recipes.map((recipe, idx) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.recipeName}</h2>
                <button
                  disabled={isRecipeSaved(recipe._id)}
                  onClick={() => saveRecipe(recipe._id)}>
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.recipeName} />
              <p>Cooking Time : {recipe.cookingTime}(minutes)</p>
            </li>
          ))
        }
      </ul>
    </>
  )
}
