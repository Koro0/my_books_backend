import {Novel} from '../../models/Novel.model';
import { Chapter } from '../../models/chapter.model';
import { Request, Response } from 'express';

export const createChapter = async (req:Request, res:Response) => {
    try{
        const NOVEL_ID  = req.params.novelId;
        const {chapterNumber, title, content} = req.body;
        if(!chapterNumber || !title || !content) {
            return res.status(400).json({
                message: 'toutes les champs doivent être completer'
            })
        }
        const CHAPTER_EXISTED = Chapter.findOne({where: chapterNumber});
        //trouver solution code si le chapter existe
        if(CHAPTER_EXISTED) {
            return res.status(400).json({
                message: 'chapter is existed !',
                dataExist: CHAPTER_EXISTED
            })
        } else {
            const newChapter = await Chapter.create({
                chapterNumber,
                title,
                content,
                NOVEL_ID
            });
            return res
            .status(201).json({
                message: 'Chapter created successfully',
                chapter: newChapter
            })
        }
        
    } 
    catch(error) {
        res.status(500).json({error});
    }
}

export const getAllChapters = async (req:Request, res:Response) => {
    const NOVEL_ID = req.params.novelId;
    await Chapter.findAll({
        where: {
            novelId : NOVEL_ID
    }})
    .then((chapters) => {
        if(!chapters) {
            return res.status(404).json({message: 'Novel not found'})
        }
        return res.status(200).json({data: chapters})
    })
    .catch((error: Error) => {
        res.status(500).json({error: error.message});
    })
}


export const getOneChapter = async (req:Request, res:Response) => {
    const NOVEL_ID = req.params.novelId;
    const CHAPTER_NUMBER = req.params.chapterId;
    await Chapter.findOne({
        where: {
            NOVEL_ID,
            CHAPTER_NUMBER
    }})
    .then((chapter) => {
        if(!chapter) {
            return res.status(404).json({message: 'chapter not found'})
        }
        return res.status(200).json({chapter: chapter})
    })
    .catch((error: Error) => {
        res.status(500).json({error: error.message});
    })
}