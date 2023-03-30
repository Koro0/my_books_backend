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

export const getAllCocktails = async (req:Request, res:Response) => {
    try {
        const cocktails = await Cocktail.findAll();
        res.status(200).json({ cocktails});
    }
    catch (error) {
        res.status(500).json({ message: 'Aucuns cocktail retrouvé !'})
    }

}

export const getOneCocktail = async (req:Request, res:Response) => {
    const ID = req.params.id;
    try {
        const cocktail = await Cocktail.findOne({where: {cocktailId: ID}});
        if (!cocktail) { // verif pour async
            return res.status(404).json({message: "Cocktail n°"+ ID + " introuvable."});
          }
        const ingredients = await Ingredient.findOne({where: {cocktailId: ID}});
        if (!ingredients) {
            return res.status(404).json({message: "Ingredient introuvable."});
          }
        const methods = await Method.findOne({where: {cocktailId: ID}});
        if (!methods) {
            return res.status(404).json({message: "Method introuvable."});
          }
        res.status(200).json({ message: "recette trouvé !", cocktail, ingredients, methods});
    }
    catch (error) {
        res.status(400).json({message: "Cocktail désigné est introuvable."})
    }
}