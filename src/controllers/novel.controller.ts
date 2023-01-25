import {Novel} from '../models/Novel.model';
import { Request, Response } from 'express';
import fs = require('fs');

export const createNovel = async (req:Request, res:Response) => {
    const reqObject = req.body;
    console.log(req.body);
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
    await Novel.update({...req.body}, {where:{id}});
    const updateNovel: Novel | null = await Novel.findByPk(id);
    return res
            .status(200).json({message:"Novel update successfull", data :updateNovel});
}

export const deleteNovel = async (req:Request, res:Response) =>{
    const {id} = req.params;
    const deleteNovel : Novel | null = await Novel.findByPk(id);
    await Novel.destroy({where: {id}});
    return res 
            .status(200).json({message: "Novel deleted successfull", data: deleteNovel});
}