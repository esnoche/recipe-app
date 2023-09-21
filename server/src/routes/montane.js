import express from "express"
import mongoose from "mongoose"
import { recipeModel } from "../models/recipes.js"
import { userModel } from "../models/users.js";

const sinew = express.Router();

sinew.get("/", async (req, res) => {
    try {

        const result = await recipeModel.find({});

        res.json(result);

    } catch (error) {

        res.json(error);

    }
});

sinew.post("/", async (req, res) => {

    const recipe = new recipeModel(req.body);

    try {

        const result = await recipe.save();

        res.json(result);

    } catch (error) {

        res.json(error);

    }
});

sinew.put("/", async (req, res) => {
    try {

        const recipe = await recipeModel.findById(req.body.recipeId);
        const user = await userModel.findById(req.body.userId);

        user.savedRecipes.push(recipe);

        await user.save();

        res.json({ savedRecipes: user.savedRecipes });

    } catch (error) {

        res.json(error);

    }
});

sinew.get("/saved-recipes/ids/:userId", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (error) {
        res.json(error);
    }
});

sinew.get("/saved-recipes", async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        const savedRecipes = await recipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes });
    } catch (error) {
        res.json(error);
    }
});

export { sinew as recipeRouter };