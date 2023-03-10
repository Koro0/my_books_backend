import { Chapter } from '../../models/novel/Chapter.model';
import { Request, Response } from 'express';

/**
 * 
 * @param NOVEL_ID get and parse novel Id
 * @param Chapter.findOrCreate find if chapter is existed else create with defauts
 * @returns message with status
 */
export const createChapter = async (req:Request, res:Response) => {
    try{
        const NOVEL_ID: number  = parseInt(req.params.novelId, 10);
        const {chapterNumber, title, content} = req.body;
        if(!chapterNumber || !title || !content) {
            return res.status(400).json({
                message: 'toutes les champs doivent être completer'
            })
        }
        const [chapter, created] = await Chapter.findOrCreate({
            where: {
                chapterNumber:chapterNumber,
                novelId:NOVEL_ID
            },
            defaults: {
                chapterNumber:chapterNumber,
                title:title,
                content:content,
                novelId:NOVEL_ID
            }
        });
        if(!created) {
            return res.status(400).json({
                message: 'chapter is existed !',
            })
        }
        return res
        .status(201).json({
            message: 'Chapter created successfully',
            chapter: chapter
        })
    } 
    catch(error) {
        res.status(500).json({error});
    }
}

/**
 * 
 * @param Chapter.findAll find all chapters with novel Id 
 * @param NOVEL_ID get and parse novel Id
 * @return all data chapters or error 
 */
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

/**
 * 
 * @param NOVEL_ID get and parse novel Id 
 * @param CHAPTER_NUMBER get chapter Number in params
 * @param Chapter.findOne find Chapter with NOVEL_ID and CHAPTER_NUMBER
 */
export const getOneChapter = async (req:Request, res:Response) => {
    const NOVEL_ID = req.params.novelId;
    const CHAPTER_NUMBER = req.params.chapterId;
    await Chapter.findOne({
        where: {
            chapterNumber:CHAPTER_NUMBER,
            novelId:NOVEL_ID
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