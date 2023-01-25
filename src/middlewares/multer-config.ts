import multer from 'multer';

 const imageFiltre = (req: any, file:any, cb:any) => {
    if(file.mimetype=== "image/jpg" || file.mimetype=== "image/jpeg"  || file.mimetype=== "image/png"){
      cb(null, true)
    } else{
      cb(new Error("Image uplaod is not of tupe jpg/jpeg/png"), false)
    }
  };
  
  
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './src/images');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      //const extension = MIME_TYPES[file.mimetype];
      callback(null,  Date.now() + name );
    },
  });
  
  module.exports = multer({ 
    storage: storage,
    fileFilter : imageFiltre,
  }).single('image');

