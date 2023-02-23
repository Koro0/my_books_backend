import {Novel} from '../../models/novel/Novel.model';
import { Request, Response } from 'express';
import fs = require('fs');

import {
    likeNovel,
} from './like.controller';
/**
 * 
 * @param req receve all req.body if there are a file, save file with a name
 * @param req if without file, save with image = null
 * @param res if OK, return status 200 with message else error
 * @returns 
 */
export const createNovel = async (req:Request, res:Response) => {
    const REQUEST_OBJET = req.body;
    console.log(req.body);
    if(req.file) {
        const novel = await Novel.create({
            ...REQUEST_OBJET,
            image:`${req.protocol}://${req.get('host')}/images/${
                req.file?.filename
              }`,
            like:0,
            likesTab:[],
            chapters: []
        });
        return res
        .status(200).json({message: "novel created successfully", data: novel});
    } else {
        const novel = await Novel.create({
            ...REQUEST_OBJET,
            image: null,
            like:0,
            likesTab:[],
            chapters: []
        });
        return res
        .status(200).json({message: "novel created successfully", data: novel});
    }
    
};

/**
 * 
 * @param ALL_NOVELS find all chapter in tables
 * @param res status 200 with succes message
 * @returns data in tables
 */
export const getAllNovel = async (req:Request, res:Response) => {
    const ALL_NOVELS : Novel[] = await Novel.findAll();
    return res.status(200).json({message:'get it is Ok', data: ALL_NOVELS})
};

/**
 * 
 * @param NOVEL_ID get id in Url in params
 * @param NOVEL find a novel with id
 * @param res status 200 with message if is OK
 * @returns  res + data
 */
export const getOneNovel = async (req:Request, res:Response) => {
    const NOVEL_ID = req.params.novelId;
    const NOVEL: Novel | null = await Novel.findByPk(NOVEL_ID);
    return res
            .status(200).json({message: "Novel fetched successfully", data: NOVEL});
}

/**
 * @param NOVEL_ID get id in Url in params
 * @param SELECT_NOVEL select NOVEL for egt file name
 * @param FILENAME get file name for novel
 * @param fs.unlink delete file in storage
 * @param UPDATED_NOVEL show updated data
 */
export const updateNovel = async (req:Request, res:Response) => {
    const NOVEL_ID = req.params.novelId;
    if(req.file == null){
        await Novel.update({...req.body},{where:{NOVEL_ID}});
    } else {
        const SELECT_NOVEL : Novel | null = await Novel.findByPk(NOVEL_ID);
        const FILENAME:any= SELECT_NOVEL?.image?.split('/')[4];
        fs.unlink( `src/images/${FILENAME}`, (err) => {
            if(err) {res.status(500).json({message: "Could not delete the file. " + err})}
            else{console.log('deleted image')};
        });
        await Novel.update({...req.body,
            image:`${req.protocol}://${req.get('host')}/images/${
                req.file?.filename
              }`}, {where:{NOVEL_ID}});
    }
    const UPDATED_NOVEL: Novel | null = await Novel.findByPk(NOVEL_ID);
    return res
            .status(200).json({message:"Novel update successfull", data :UPDATED_NOVEL});
}
 /**
  * 
  * @param DELETED_NOVEL find novel to delete
  * @param FILENAME get file name to delete a file
  * @returns status + message + deleted data
  */
export const deleteNovel = async (req:Request, res:Response) =>{
    const NOVEL_ID = req.params.novelId;
    const DELETED_NOVEL : Novel | null = await Novel.findByPk(NOVEL_ID);
    
    if(DELETED_NOVEL?.image){
        const FILENAME :string = DELETED_NOVEL.image.split('/')[4]; 
        fs.unlink( `src/images/${FILENAME}`, (err) => {
            if(err) {res.status(500).json({message: "Could not delete the file. " + err})}
            else{console.log('deleted image')};
        });
    }
    await Novel.destroy({where: {NOVEL_ID}});
    return res 
            .status(200).json({message: "Novel deleted successfull", data: DELETED_NOVEL});
}