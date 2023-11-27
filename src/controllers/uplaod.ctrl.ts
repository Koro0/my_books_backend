import fs from 'fs';
import { Image } from '../models/image.model';
import { Request, Response } from 'express';

export const uplaodFile = async (req: Request, res: Response) => {
  try {
    if (req.file == undefined) {
      return res.send('Selct a file pls');
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(__dirname + './uplaods' + req.file.filename),
    }).then((image) => {
      fs.writeFileSync(__dirname + './images' + image.name, image.data);
      return res.send('uplaoded successfull');
    });
  } catch (err) {
    console.log(err);
    return res.send('Error for update image ');
  }
};
