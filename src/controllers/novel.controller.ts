import {Novel} from '../models/Novel.model';
import { Request, Response } from 'express';
import fs = require('fs');

export const createNovel = async (req:Request, res:Response) => {
    const reqObject = req.body;
    console.log(req.body);
    if(req.file) {
        const novel = await Novel.create({
            ...reqObject,
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
            ...reqObject,
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
    const allNovels : Novel[] = await Novel.findAll();
    return res.status(200).json({message:'get it is Ok', data: allNovels})
};

export const getOneNovel = async (req:Request, res:Response) => {
    const novelId = req.params.novelId;
    console.log(req.params.novelId);
    const novel: Novel | null = await Novel.findByPk(novelId);
    return res
            .status(200).json({message: "Novel fetched successfully", data: novel});
}

export const updateNovel = async (req:Request, res:Response) => {
    const novelId = req.params.novelId;
    if(req.file == null){
        await Novel.update({...req.body},{where:{novelId}});
    } else {
        const forDeleteImg : Novel | null = await Novel.findByPk(novelId);
        const filename:any= forDeleteImg?.image?.split('/')[4];
        console.log(filename);
        fs.unlink( `src/images/${filename}`, (err) => {
            if(err) {res.status(500).json({message: "Could not delete the file. " + err})}
            else{console.log('deleted image')};
        });
        await Novel.update({...req.body,
            image:`${req.protocol}://${req.get('host')}/images/${
                req.file?.filename
              }`}, {where:{novelId}});
    }
    const updatedNovel: Novel | null = await Novel.findByPk(novelId);
    return res
            .status(200).json({message:"Novel update successfull", data :updatedNovel});
}

export const deleteNovel = async (req:Request, res:Response) =>{
    const novelId = req.params.novelId;
    const deleteNovel : Novel | null = await Novel.findByPk(novelId);
    
    if(deleteNovel?.image){
        const filename :string = deleteNovel.image.split('/')[4]; 
        console.log(filename);
        fs.unlink( `src/images/${filename}`, (err) => {
            if(err) {res.status(500).json({message: "Could not delete the file. " + err})}
            else{console.log('deleted image')};
        });
    }
    await Novel.destroy({where: {novelId}});
    return res 
            .status(200).json({message: "Novel deleted successfull", data: deleteNovel});
}
