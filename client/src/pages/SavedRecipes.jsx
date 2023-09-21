import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId';

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/recipes/saved-recipes/${userId}`);
        setSavedRecipes(result.data.savedRecipes);
      } catch (error) {

      }
    };
    fetchSavedRecipes();
  }, []);
  
  return (
    <>
      <h2>Saved Recipes</h2>
      <ul>
        {
          savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.recipeName}</h2>
                
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
