import {Novel} from '../models/Novel.model';
import {User} from '../models/User.model';
import { Request, Response } from 'express';
import fs = require('fs')

export const createNovel = async (req:Request, res:Response) => {
    const reqObject = req.body;
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
        .status(200).json({message: "novel createdsuccessfully", data: novel});
    
};
export const hello = async (req:Request, res:Response) => {
    return res.status(200).json({message:'ok'})
};