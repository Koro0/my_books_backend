import { Request, Response } from "express";
import { Cocktail } from "../../models/recipe/Cocktail.model";
import { Ingredient } from "../../models/recipe/Ingredient.model";
import { Method } from "../../models/recipe/Method.model";

export const createCocktail = async (req:Request,res:Response)=> {
    try{
        // récupération des données envoyées dans la requête
        const { title, difficulty, portion, time, description, ingredientList, methodList } = req.body; 

        //creer le cocktail 
        const cocktail = await Cocktail.create({
            title, 
            difficulty,
            portion, 
            time, 
            description,
        });

        //ajout ingredients
        for (const ingredientData of ingredientList) {
            const ingredient = await Ingredient.create(ingredientData);
            await cocktail.addIngredient(ingredient);
        }

        //ajout ingredients
        for (const methodData of methodList) {
            const method = await Method.create(methodData);
            await cocktail.addMethod(method);
        }
        //reponse au client
        res.status(201).json({ cocktail });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la creation de cocktail !'});
    }
}