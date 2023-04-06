import { Recipe } from "../../models/recipe/Recipe.model";
import { Request, Response } from "express";
import { Ingredient } from "../../models/recipe/Ingredient.model";
import { Method } from "../../models/recipe/Method.model";

export const createRecipe = async (req:Request, res:Response) => {
    try {
        const {title, description, author, portion, time, ingredientList, methodList} = req.body;
        
            const recipe = await Recipe.create({
                title, 
                description,
                image: (req.file ?`${req.protocol}://${req.get('host')}/images/${
                    req.file?.filename
                }`: null),
                author, 
                portion, 
                time,
                likes:[]
            });
        
        //ajout ingredients
        for (const ingredientData of ingredientList) {
            const ingredient = await Ingredient.create(ingredientData);
            await recipe.addIngredient(ingredient);
        }
       //ajout ingredients
       for (const methodData of methodList) {
        const method = await Method.create(methodData);
        await recipe.addMethod(method);
        }

        return res.status(201).json({message: 'New recipe created !', recipe});

    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur: create recette de cuisine !"})
    }
}

export const getAllRecipe = async (req:Request, res:Response) => {
    const ALL_RECIPES: Recipe[] = await Recipe.findAll();
    return res.status(200).json({message:'get All recipes successfull', data: ALL_RECIPES});
}