import { Chapter } from '../../models/novel/Chapter.model';
import { Request, Response } from 'express';
import { Novel } from '../../models/novel/Novel.model';
import { ParagraphList } from '../../models/novel/ParagraphList.model';

/**
 * 
 * @param NOVEL_ID get and parse novel Id
 * @param Chapter.findOrCreate find if chapter is existed else create with defauts
 * @returns message with status
 */
export const createChapter = async (req:Request, res:Response) => {
    try{
        const novelId: number  = parseInt(req.params.novelId, 10);
        const {chapterNumber, title} = req.body;
        if(!chapterNumber || !title) { //verification champ req
            return res.status(400).json({
                message: 'toutes les champs doivent être completer'
            })
        }
        const novelExist : Novel | null = await Novel.findOne({where:{novelId:req.params.novelId}});
        if(!novelExist) { //verif existance novel
            return res.status(400).json({msg:"Novel not exist !"});
        }
        const [chapter, created] = await Chapter.findOrCreate({ //verif existance du meme chapitre sinon creer le chapitre
            where: {
                chapterNumber:chapterNumber,
                novelId:novelId
            },
            defaults: {
                chapterNumber:chapterNumber,
                title:title,
                novelId:novelId
            }
        });
        if(!created) {
            return res.status(400).json({
                message: 'chapter is existed !',
            })
        }
        return res
        .status(200).json({
            message: 'Chapter created successfully',
            chapter: chapter
        })
    } 
    catch(error) {
        res.status(500).json({error});
    }
}

import { Optional } from 'sequelize';

interface ParagraphAttributes {
  id:number;
  paragraphId:number;
  orders:number;
  paragraph:string;
  novelId:number;
  chapterId:number;
}
interface ParagraphCreationAttributes extends Optional<ParagraphAttributes, 'id'> {}
/**
 * A tester
 * @param req 
 * @param res 
 */
export const createParagraph =async (req:Request, res:Response) => {
    const novel_Id = req.params.novelId;
    const chapter_Id = req.params.chapterId;
    const { paragraphs } = req.body;
    if(!Array.isArray(paragraphs) || paragraphs.length===0) {
       return res.status(400).json({ error: "Le champ paragraph doit etre un tableau !"});
    }
    try {
        const paragraphsToInsert = paragraphs.map((paragraph:any) => ({
            ...paragraph,
            novel_Id,
            chapter_Id
          }));
      
          const createdParagraphs = await ParagraphList.bulkCreate(paragraphsToInsert);

        res.status(201).json({message:  "Paragraphees créer avec succès !" + createdParagraphs});
    } catch (err) {
        res.status(400).json({message: "Erreur de creation de paragraphes" + err});
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
        }
    })
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
 * @param req get prams 
 * @param res return all paragraphs for the chapter
 */
export const getAllParagraphs = async (req:Request, res:Response) => {
    const novel_Id = req.params.novelId;
    const chapter_Id = req.params.chapterId;
    await ParagraphList.findAll({
        where: {
            chapterId: chapter_Id,
            novelId:novel_Id
        }
    })
        .then((paragraph)=> {
            if(!paragraph) {
                return res.status(404).json({message: "Any content founded"})
            }
            return res.status(200).json({data:paragraph})
        })
        .catch((error:Error)=> {
            res.status(404).json({error: error.message});
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