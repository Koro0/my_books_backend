import {Novel} from '../../models/Novel.model';
import { Request, Response } from 'express';

export const createChapter = async (req:Request, res:Response) => {
    const {id} = req.params;
    const {data} = req.body;
    await Novel.findByPk(id)
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