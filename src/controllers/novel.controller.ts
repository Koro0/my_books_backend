import {Novel} from '../models/Novel.model';
import { Request, Response } from 'express';
import fs = require('fs');

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
export const getAllNovel = async (req:Request, res:Response) => {
    const ALL_NOVELS : Novel[] = await Novel.findAll();
    return res.status(200).json({message:'get it is Ok', data: ALL_NOVELS})
};

export const getOneNovel = async (req:Request, res:Response) => {
    const NOVEL_ID = req.params.novelId;
    console.log(req.params.novelId);
    const NOVEL: Novel | null = await Novel.findByPk(NOVEL_ID);
    return res
            .status(200).json({message: "Novel fetched successfully", data: NOVEL});
}

export const updateNovel = async (req:Request, res:Response) => {
    const NOVEL_ID = req.params.novelId;
    if(req.file == null){
        await Novel.update({...req.body},{where:{NOVEL_ID}});
    } else {
        const forDeleteImg : Novel | null = await Novel.findByPk(NOVEL_ID);
        const filename:any= forDeleteImg?.image?.split('/')[4];
        console.log(filename);
        fs.unlink( `src/images/${filename}`, (err) => {
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

export const deleteNovel = async (req:Request, res:Response) =>{
    const NOVEL_ID = req.params.novelId;
    const DELETED_NOVEL : Novel | null = await Novel.findByPk(NOVEL_ID);
    
    if(DELETED_NOVEL?.image){
        const filename :string = DELETED_NOVEL.image.split('/')[4]; 
        console.log(filename);
        fs.unlink( `src/images/${filename}`, (err) => {
            if(err) {res.status(500).json({message: "Could not delete the file. " + err})}
            else{console.log('deleted image')};
        });
    }
    await Novel.destroy({where: {NOVEL_ID}});
    return res 
            .status(200).json({message: "Novel deleted successfull", data: DELETED_NOVEL});
}
