import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const userId = useGetUserId();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const load = await axios.get("http://localhost:3001/recipes");
        setRecipes(load.data);
        console.log(load.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipe();
  }, []);
  const saveRecipe = async (recipeId) => {
    try {
      const result = await axios.put("http://localhost:3001/recipes", { recipeId, userId });

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <h2>Recipes</h2>
      <ul>
        {
          recipes.map((recipe, idx) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.recipeName}</h2>
                <button onClick={() => saveRecipe(recipe._id)}>Save</button>
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
