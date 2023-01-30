import {Novel} from '../models/Novel.model';
import { Request, Response } from 'express';
import fs = require('fs');
import path = require('path');

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
            Chapiter: []
        });
        return res
        .status(200).json({message: "novel created successfully", data: novel});
    } else {
        const novel = await Novel.create({
            ...reqObject,
            image: null,
            like:0,
            likesTab:[],
            Chapiter: []
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
    const {id} = req.params;
    console.log(req.params);
    const novel: Novel | null = await Novel.findByPk(id);
    return res
            .status(200).json({message: "Novel fetched successfully", data: novel});
}

export const updateNovel = async (req:Request, res:Response) => {
    const {id} = req.params;
    if(req.file == null){
        await Novel.update({...req.body},{where:{id}});
    } else {
        await Novel.update({...req.body,
            image:`${req.protocol}://${req.get('host')}/images/${
                req.file?.filename
              }`}, {where:{id}});
    }
    const updateNovel: Novel | null = await Novel.findByPk(id);
    return res
            .status(200).json({message:"Novel update successfull", data :updateNovel});
}

export const deleteNovel = async (req:Request, res:Response) =>{
    const {id} = req.params;
    const deleteNovel : Novel | null = await Novel.findByPk(id);
    
    if(deleteNovel?.image){
        const filename :string = deleteNovel.image.split('/')[4];
        console.log(filename);
        fs.unlink( `src/images/${filename}`, (err) => {
            if(err) {res.status(500).json({message: "Could not delete the file. " + err})}
            else{console.log('deleted image')};
        });
    }
    await Novel.destroy({where: {id}});
    return res 
            .status(200).json({message: "Novel deleted successfull", data: deleteNovel});
}
