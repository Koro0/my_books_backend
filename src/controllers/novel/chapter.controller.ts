import {Novel} from '../../models/Novel.model';
import { Chapter } from '../../models/chapter.model';
import { Request, Response } from 'express';

export const createChapter = async (req:Request, res:Response) => {
    const {novelId} = req.params;
    const {data} = req.body;
   /* await Novel.findByPk(id)
        .then((novel: Novel | null) => {
            if(!novel) {
                return res.status(404).json({message: 'Novel not found'})
            }
            if(!novel.chapters) {
                return res.status(400).json({message: 'Chapters not found in this Novel'})
            } else {
                const updatedData = { ...novel.chapters, ...data,};
                return Novel.update({ chapters: updatedData},{where: {id:id}});
            }
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message});
        })*/
    try{
        const novel = await Novel.findByPk(novelId);
        if(!novel) {
            return res.status(404).send({error:'Novel not found'});
        }

        const chapter = await Chapter.create({...data, novelId});
        res.send(chapter);
    } 
    catch(error) {
        res.status(500).json({error});
    }
    
}

export const getChapter = async (req:Request, res:Response) => {
    const {id} = req.params;
    await Novel.findByPk(id)
    .then((novel: Novel | null) => {
        if(!novel) {
            return res.status(404).json({message: 'Novel not found'})
        }
        if(!novel.chapters) {
            return res.status(400).json({message: 'Chapters not found in this Novel'})
        }
        return res.status(200).json({chapters: novel.chapters})
    })
    .catch((error: Error) => {
        res.status(500).json({error: error.message});
    })
}