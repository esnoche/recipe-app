import React, { useState } from 'react'

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  }
  const handleIngrdientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  }
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }
  return (
    <div className="create-recipe">
      <h2 className="heading-2">
        Create Recipe
      </h2>
      <form className="create-recipe-form">

        <label htmlFor="recipeName">
          Rcipe Name
        </label>
        <input
          type="text"
          id="name"
          name="recipeName"
          onChange={handleChange}
        />

        <label htmlFor="ingredients">
          Ingredients
        </label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngrdientChange(e, idx)}
          />
        ))}
        <button
          type="button"
          onClick={addIngredient}
        >
          Add Ingredient

        </button>

        <label htmlFor="instructions">
          Instructions
        </label>
        <textarea
          id="instructions"
          name="instructions"
          cols="30"
          rows="10"
        >
        </textarea>

        <label htmlFor="imageUrl">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">
          Cooking Time (in minutes)
        </label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />

        <button type="submit">Create Recipe</button>

      </form>
    </div>
  )
}
