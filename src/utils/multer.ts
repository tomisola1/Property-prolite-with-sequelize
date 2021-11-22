import multer from 'multer';
// const Datauri = require ('datauri');
import path from 'path';

export const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, callback: any) => {
      let ext = path.extname(file.originalname);
      if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        callback(new Error('File type is not supported.'), false);
        return;
      }
      callback(null, true);
    }
});
  
// const dUri = new Datauri();
// const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);


// export { multerUploads, dataUri };