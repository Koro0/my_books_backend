import { Recipe } from "../../models/recipe.model/Recipe.model";
import { Etape } from "../../models/recipe.model/etape.model";
import { Request, Response } from "express";

export const createRecipe = async (req:Request, res:Response) => {
    const REQUEST_NEW_RECIPE = req.body;
    if(req.file) {
        const recipe = await Recipe.create({
            ...REQUEST_NEW_RECIPE,
            image:`${req.protocol}://${req.get('host')}/images/${
                req.file?.filename
              }`,
            likes:[],
            etape:[]
        });
        return res.status(201).json({message: 'New recipe created !', data: recipe});
    } else {
        const recipe = await Recipe.create({
            ...REQUEST_NEW_RECIPE,
            image: null,
            likes:[],
            etape: []
        });
        return res.status(201).json({message: 'New recipe created !', data: recipe});
    }
}

export const getAllRecipe = async (req:Request, res:Response) => {
    const ALL_RECIPES: Recipe[] = await Recipe.findAll();
    return res.status(200).json({message:'get All recipes successfull', data: ALL_RECIPES});
}