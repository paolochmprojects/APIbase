import { Router } from 'express';
import { verifyToken } from '../middlewares/authentication.js'
import { upload } from '../middlewares/fileUploader.js'
import { deleteFile, downloadFile, getFiles, uploadFile, uploadFiles } from '../controllers/file.js'

const router = Router();

// routes
router.post('/single', verifyToken, upload.single("file"), uploadFile);
router.post('/multiple', verifyToken, upload.array("files"), uploadFiles);
router.get('/all', verifyToken, getFiles);
router.get('/:filename', verifyToken, downloadFile);
router.delete('/:filename', verifyToken, deleteFile);

export default router;

