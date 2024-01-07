import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    // create folder if not exist whit public/user-{id}
    destination: async (req, file, cb) => {
        let path = `public/user-${req.user.id}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    // file name with {timestamp}.{extension}
    filename: async (req, file, cb) => {
        let extension = file.originalname.split(".").pop();
        cb(null, `${Date.now()}.${extension}`);
    }
})

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

export { upload };