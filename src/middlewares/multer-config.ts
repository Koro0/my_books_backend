import multer from 'multer';

const imageFiltre = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uplaod is not of type jpg/jpeg/png'), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, Date.now() + name);
  },
});

module.exports = multer({
  storage: storage,
  fileFilter: imageFiltre,
}).single('images'); //un fichier image
//array('image) => pour plusieurs images
