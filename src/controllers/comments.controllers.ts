import { Request, Response } from "express";
import { Comments } from "../models/Comments.models";
import { Recipe } from "../models/recipe/Recipe.model";
import { Novel } from "../models/novel/Novel.model";
import { Cocktail } from "../models/recipe/Cocktail.model";

export const createCommentRecipe =async (res:Response, req:Request) => {
    const recipeId = req.params.recipeId;
    try {
        const { userId, commentText } = req.body;
        if (!userId || !commentText) {
            return res.status(400).json({msg: "Contenu obligatoire"})
        }
        const NEW_COMMENT = await Comments.create({
            userId,
            commentText,
            recipeId,
        }) 
        return res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) {
        return res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}

export const createCommentNovel =async (res:Response, req:Request) => {
    const novelId = req.params.novelId;
    try {
        const { userId, commentText } = req.body;
        if (!userId || !commentText) {
            return res.status(400).json({msg: "Contenu obligatoire"})
        }
        const NEW_COMMENT = await Comments.create({
            userId,
            commentText,
            novelId
        }) 
        return res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) {
        return res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}

export const createCommentCocktail=async (res:Response, req:Request) => {
    const cocktailId = req.params.cocktailId;
    try {
        const { userId, commentText } = req.body;
        if (!userId || !commentText) {
            return res.status(400).json({msg: "Contenu obligatoire"})
        }
        const NEW_COMMENT = await Comments.create({
            userId,
            commentText,
            cocktailId
        }) 
        return res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) {
        return res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}