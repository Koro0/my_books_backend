import { Request, Response } from 'express';
import { LikesTab } from '../../models/LikesTabs.model';
/**
 * system a revoir
 * @param req 
 * @param res 
 * @returns 
 */
export const likeNovel= async (req:Request, res:Response) => {
    try {
        const NOVEL_ID:number = parseInt(req.params.novelId);
        const {userId, like} = req.body;
        const LIKES_TAB:any= LikesTab.findOne({
            where:{
                novelId:NOVEL_ID
            }
        })
        if(like===1){
            const updateLikedUsers = [...LIKES_TAB.likedUsers, userId];
            await LIKES_TAB.update({likedUsers:updateLikedUsers, likesCount:+1}, {fields:['likedUsers', 'likesCount']});
            return res.status(200).json({message:'Liked !'});
        }
        if(like===0){
            const updateLikedUsers= LIKES_TAB.likedUsers.filter((user:number)=>user !== userId);
            await LIKES_TAB.update({likedUsers:updateLikedUsers, likesCount:-1 }, {fields:['likedUsers', 'likesCount']});
            return res.status(200).json({message:'Disliked !'})
        }
    } catch (error) {
        console.error(error);
    }
}
