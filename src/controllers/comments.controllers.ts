import { Request, Response } from "express";
import { Comments } from "../models/Comments.models";
import { Recipe } from "../models/recipe/Recipe.model";
import { Novel } from "../models/novel/Novel.model";
import { Cocktail } from "../models/recipe/Cocktail.model";

export const createCommentRecipe =async (res:Response, req:Request) => {
    const recipeId = req.params.recipeId;
    const authId = req.auth;
    try {
        const { userId, commentText } = req.body;
        if (!userId || !commentText) {
            return res.status(400).json({msg: "Contenu obligatoire"})
        }
        const NEW_COMMENT = await Comments.create({
            userId:authId,
            commentText,
            recipeId,
        }) 
        return res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) {
        return res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}

export const getAllRecipeComment =async (res:Response, req:Request) => {
    const recipeId = req.params.recipeId;
    try {
        const comments = await Comments.findAll({where:{recipeId:recipeId}})
        if(!comments) {
            return res.status(400).json({msg:"Aucun commentaires retrouvées"})
        }
        return res.status(200).json({comments})
    } catch (error) {
        return res.status(400).json({msg: "Erreur de recuperation des commentaires des recettes", error})
    }
}

export const createCommentNovel =async (res:Response, req:Request) => {
    const novelId = req.params.novelId;
    const authId = req.auth;
    try {
        const { userId, commentText } = req.body;
        if (!userId || !commentText) {
            return res.status(400).json({msg: "Contenu obligatoire"})
        }
        const NEW_COMMENT = await Comments.create({
            userId:authId,
            commentText,
            novelId
        }) 
        return res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) {
        return res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}

export const getAllNovelComment =async (res:Response, req:Request) => {
    const novelId = req.params.novelId;
    try {
        const comments = await Comments.findAll({where:{novelId:novelId}})
        if(!comments) {
            return res.status(400).json({msg:"Aucun commentaires retrouvées"})
        }
        return res.status(200).json({comments})
    } catch (error) {
        return res.status(400).json({msg: "Erreur de recuperation des commentaires des recettes", error})
    }
}

export const createCommentCocktail=async (res:Response, req:Request) => {
    const cocktailId = req.params.cocktailId;
    const authId = req.auth;
    try {
        const { userId, commentText } = req.body;
        if (!userId || !commentText) {
            return res.status(400).json({msg: "Contenu obligatoire"})
        }
        const NEW_COMMENT = await Comments.create({
            userId:authId,
            commentText,
            cocktailId
        }) 
        return res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) {
        return res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}

export const getAllCocktailComment =async (res:Response, req:Request) => {
    const cocktailId = req.params.cocktailId;
    try {
        const comments = await Comments.findAll({where:{cocktailId:cocktailId}})
        if(!comments) {
            return res.status(400).json({msg:"Aucun commentaires retrouvées"})
        }
        return res.status(200).json({comments})
    } catch (error) {
        return res.status(400).json({msg: "Erreur de recuperation des commentaires des recettes", error})
    }
}