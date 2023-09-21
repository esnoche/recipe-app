import express from "express"
import { recipeModel } from "../models/recipes.js"
import { userModel } from "../models/users.js";
import { verifyToken } from "./alpine.js";

const sinew = express.Router();

sinew.get("/", async (req, res) => {
    try {

        const result = await recipeModel.find({});

        res.json(result);

    } catch (error) {

        res.json(error);

    }
});

sinew.post("/", verifyToken, async (req, res) => {

    const recipe = new recipeModel(req.body);

    try {

        const result = await recipe.save();

        res.json(result);

    } catch (error) {

        res.json(error);

    }
});

sinew.put("/", verifyToken, async (req, res) => {
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

sinew.get("/saved-recipes/:userId", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);
        const savedRecipes = await recipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes });
    } catch (error) {
        res.json(error);
    }
});

export { sinew as recipeRouter };