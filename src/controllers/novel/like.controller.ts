import { Request, Response } from 'express';
import { LikesTab } from '../../models/LikesTabs.model';
import authenticate from '../../middlewares/auth';
/**
 * system a revoir
 * @param req 
 * @param res 
 * @returns 
 */
export const likesRecipe = async (req:Request, res:Response) => {
    const userId = res.locals.authUser;
    try {
        const ID:number = parseInt(req.params.id);
        const {like} = req.body;
        
        let LIKED_TAB:any= await LikesTab.findOne({
            where:{
                recipeId:ID
            }
        })
        if(!LIKED_TAB){
            LIKED_TAB = await LikesTab.create({
                novelId:ID,
                likedUsers: [],
                likesCount: 0,
            })
        }
        if(Array.isArray(LIKED_TAB.likedUsers)){
            if(like===1){
                const updateLikedUsers = LIKED_TAB.likedUsers.filter((user: any) => user !== null).concat(userId);;
                LIKED_TAB.likedUsers = updateLikedUsers;
                LIKED_TAB.likesCount = parseInt(LIKED_TAB.likesCount)+1;
                await LIKED_TAB.save({fields:['likedUsers', 'likesCount']});
                return res.status(200).json({message:'Liked !', LIKED_TAB});
            }
            if(like===0){
                const updateLikedUsers= LIKED_TAB.likedUsers.filter((user:number)=>user !== userId);
                LIKED_TAB.likedUsers = updateLikedUsers;
                LIKED_TAB.likesCount = Math.max(0,parseInt(LIKED_TAB.likesCount)-1);
                await LIKED_TAB.save({fields:['likedUsers', 'likesCount']});
                return res.status(200).json({message:'Disliked !', LIKED_TAB})
            }
        }
        return res.status(201).json({msg:'likes'})
    } catch (error) {
        console.error(error);
    }
}
export const likesNovel = async (req:Request, res:Response) => {
    const userId = res.locals.authUser;
    console.log(res.locals.authUser);
    try {
        const ID:number = parseInt(req.params.id);
        const {like} = req.body;
        
        let LIKED_TAB:any= await LikesTab.findOne({
            where:{
                novelId:ID
            }
        })
        if(!LIKED_TAB){
            LIKED_TAB = await LikesTab.create({
                novelId:ID,
                likedUsers: [],
                likesCount: 0,
            })
        }
        if(Array.isArray(LIKED_TAB.likedUsers)){
            if(like===1){
                const updateLikedUsers = LIKED_TAB.likedUsers.filter((user: any) => user !== null).concat(userId);;
                LIKED_TAB.likedUsers = updateLikedUsers;
                LIKED_TAB.likesCount = parseInt(LIKED_TAB.likesCount)+1;
                await LIKED_TAB.save({fields:['likedUsers', 'likesCount']});
                return res.status(200).json({message:'Liked !', LIKED_TAB});
            }
            if(like===0){
                const updateLikedUsers= LIKED_TAB.likedUsers.filter((user:number)=>user !== userId);
                LIKED_TAB.likedUsers = updateLikedUsers;
                LIKED_TAB.likesCount = Math.max(0,parseInt(LIKED_TAB.likesCount)-1);
                await LIKED_TAB.save({fields:['likedUsers', 'likesCount']});
                return res.status(200).json({message:'Disliked !', LIKED_TAB})
            }
        }
        return res.status(201).json({msg:'likes'})
    } catch (error) {
        console.error(error);
    }
}
