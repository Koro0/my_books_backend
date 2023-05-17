import { Request, Response } from "express";
import { Cocktail } from "../../models/recipe/Cocktail.model";
import { Ingredient } from "../../models/recipe/Ingredient.model";
import { Method } from "../../models/recipe/Method.model";
import { User } from "../../models/User.model";

/**
 * 
 * @param req request body
 * @param res create a new cocktail recipe
 * @return message and the new recipe
 */
export const createCocktail = async (req:Request,res:Response)=> {
    try{
        // récupération des données envoyées dans la requête
        const { title, difficulty, portion, time, description, ingredientList, methodList } = req.body; 

        //creer le cocktail 
        const cocktail = await Cocktail.create({
            title, 
            image: (req.file ?`${req.protocol}://${req.get('host')}/images/${
                    req.file?.filename
                }`: null),
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

/**
 * 
 * @param res return all cocktail to find in database
 */
export const getAllCocktails = async (req:Request, res:Response) => {
    try {
        const cocktails: Cocktail[] = await Cocktail.findAll();
        res.status(200).json({ cocktails});
    }
    catch (error) {
        res.status(500).json({ message: 'Aucuns cocktail retrouvé !'})
    }

}

/**
 * 
 * @param req get params id
 * @param res return cocktail data with their ingredient and mathod
 * @returns message if we have a erreur 
 */
export const getOneCocktail = async (req:Request, res:Response) => {
    const ID = req.params.id;
    try {
        const cocktail = await Cocktail.findOne({where: {cocktailId: ID}});
        if (!cocktail) { // verif pour async
            return res.status(404).json({message: "Cocktail n°"+ ID + " introuvable."});
          }
        const ingredients = await Ingredient.findAll({where: {cocktailId: ID}});
        if (!ingredients) {
            return res.status(404).json({message: "Ingredient introuvable."});
          }
        const methods = await Method.findAll({where: {cocktailId: ID}});
        if (!methods) {
            return res.status(404).json({message: "Method introuvable."});
          }
        return res.status(200).json({ message: "recette trouvé !", cocktail, ingredients, methods});
    }
    catch (error) {
        res.status(400).json({message: "Cocktail désigné est introuvable."})
    }
}

/**
 * 
 * @param req get Cocktail Id and userId
 * @param res 
 * @returns 
 */
export const deleteCocktail = async (req:Request, res:Response) => {
    const ID = req.params.id;
    const userId = req.params.userid;
    console.log(userId, ID);
    try {
        const user = await User.findByPk(userId);
        if(!user) { // verifie si l'user existe
            return res.status(400).json({message: "Utilisateur" + userId + " introuvable !"})
        }
        const itIsAdmin:number = user.adminStatus;
        if(itIsAdmin==0) {
            res.status(401).json({message:"Don't have access !"})
        }
        const cocktail = await Cocktail.findByPk(ID);
        if(!cocktail){
            return res.status(400).json({ message: "Cocktail instrouvable"})
        }
        Cocktail.destroy({where: {cocktailId:ID}});
        Ingredient.destroy({where: {cocktailId:ID}});
        Method.destroy({where: {cocktailId:ID}});
        return res.status(200).json({message: "Cocktail supprim avec succes"})
    }
    catch(error) {
        res.status(400).json({message: "Error de supprimer du Cocktail "+ID})
    }
}