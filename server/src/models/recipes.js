import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    instructions: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    userOwner: {
        type: String,
        required: true,
    },
});

export const recipeModel = mongoose.model("recipe", recipeSchema);