import { Request, Response } from "express";
import { Comments } from "../models/Comments.models";
import { User } from "../models/User.model";
import { Novel } from "../models/novel/Novel.model";
import { Cocktail } from "../models/recipe/Cocktail.model";


/***
 * create & get && delete recipe Comments
 */
export const createCommentRecipe =async (req:Request, res:Response) => {
    try {
        const { commentText , recipeId, userId } = req.body;
        if (!commentText || !recipeId || !userId) {
            return res.status(400).json({msg: "Contenu obligatoire"})
        }
        const isAdmin = await User.findOne({where:{userId:userId, adminStatus: 0}})
        if(!isAdmin) {
            return res.status(400).json({msg:"Droit adminitrateur requis"})
        }
        const NEW_COMMENT = await Comments.create({
            userId,
            commentText,
            recipeId,
        }) 
        res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) { 
        res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}

export const getAllRecipeComment =async (req:Request, res:Response) => {
    const ID = req.params.id;
    try {
        const comments = await Comments.findAll({where:{recipeId:ID}})
        if(!comments) {
            return res.status(400).json({msg:"Aucun commentaires retrouvées"})
        }
        res.status(200).json({comments})
    } catch (error) {
        res.status(400).json({msg: "Erreur de recuperation des commentaires des recettes", error})
    }
}

export const deleteCommentRecipe =async (req:Request, res:Response) => {
    const ID = req.params.id;
    try {
        const commentToDelected = await Comments.destroy({where:{commentId:ID}});
        if(!commentToDelected) {
            return res.status(400).json({msg: "Commentaire introuvable"})
        }
        return res.status(200).json({msg: "Commentaire supprimé avec succes"})
    } catch (error) {
        return res.status(400).json({msg: "Erreur suppression du commentaire"})
    }
}


/***
 * create & get && delete Novel Comments
 */
export const createCommentNovel =async (req:Request, res:Response) => {
    try {
        const { userId, commentText, novelId} = req.body;
        if (!userId || !commentText || !novelId) {
            return res.status(400).json({msg: "Contenu obligatoire"})
        }
        const NEW_COMMENT = await Comments.create({
            userId,
            commentText,
            novelId
        }) 
        res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) {
        res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}

export const getAllNovelComment =async (req:Request, res:Response) => {
    const novelId = req.params.id;
    try {
        const comments = await Comments.findAll({where:{novelId:novelId}})
        if(!comments) {
            return res.status(400).json({msg:"Aucun commentaires retrouvées"})
        }
         res.status(200).json({comments})
    } catch (error) {
         res.status(400).json({msg: "Erreur de recuperation des commentaires des recettes", error})
    }
}

export const deleteNovelComment =async (req:Request, res:Response) => {
    const ID = req.params.id;
    try {
        const commentToDelected = await Novel.destroy({where:{commentId:ID}});
        if(!commentToDelected) {
            return res.status(400).json({msg: "Commentaire introuvable"})
        }
        return res.status(200).json({msg: "Commentaire supprimé avec succes"})
    } catch (error) {
        return res.status(400).json({msg: "Erreur suppression du commentaire"})
    }
}

/***
 * create & get && delete cocktail Comments
 */
export const createCommentCocktail=async (req:Request, res:Response) => {
    const cocktailId = req.params.id;
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
         res.status(201).json({msg:"commentaire créé", NEW_COMMENT})
    }
    catch (err) {
         res.status(400).json({msg:"Erreur creation de commentaire", err})
    }
}

export const getAllCocktailComment =async ( req:Request, res:Response) => {
    const cocktailId = req.params.id;
    try {
        const comments = await Comments.findAll({where:{cocktailId:cocktailId}})
        if(!comments) {
            return res.status(400).json({msg:"Aucun commentaires retrouvées"})
        }
         res.status(200).json({comments})
    } catch (error) {
         res.status(400).json({msg: "Erreur de recuperation des commentaires des recettes", error})
    }
}

export const deleteCocktailComment =async (req:Request, res:Response) => {
    const ID = req.params.id;
    try {
        const commentToDelected = await Cocktail.destroy({where:{commentId:ID}});
        if(!commentToDelected) {
            return res.status(400).json({msg: "Commentaire introuvable"})
        }
        return res.status(200).json({msg: "Commentaire supprimé avec succes"})
    } catch (error) {
        return res.status(400).json({msg: "Erreur suppression du commentaire"})
    }
}