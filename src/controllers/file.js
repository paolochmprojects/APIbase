import db from "../database.js"
import fs from "fs"

export const uploadFile = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "file is required" })
    let { originalname, encoding, mimetype, destination, filename, path, size } = await req.file
    let newFile = await db.file.create({
        data: {
            originalname,
            encoding,
            mimetype,
            destination,
            filename,
            path,
            size,
            user: {
                connect: {
                    id: req.user.id
                }
            }
        }
    })
    return res.status(201).json({ message: "upload file", file: newFile })
}

export const uploadFiles = async (req, res) => {
    return res.json({ message: "upload files" })
}

export const deleteFile = async (req, res) => {
    const { filename } = req.params

    let filedata = await db.file.findFirst({
        where: {
            filename: filename,
            userId: req.user.id
        }
    })

    if (!filedata) return res.status(404).json({ message: "file not found" })
    let path = filedata.path

    fs.unlink(path, (err) => {
        if (err) return res.status(500).json({ message: "internal server error" })
    })

    let deleteFile = await db.file.delete({
        where: {
            id: filedata.id
        }
    })

    return res.status(200).json({ message: "delete file", file: deleteFile})
}

export const downloadFile = async (req, res) => {
    const { filename } = req.params
    let filedata = await db.file.findFirst({
        where: {
            filename: filename,
            userId: req.user.id
        }
    })
    if (!filedata) return res.status(404).json({ message: "file not found" })
    let path = filedata.path
    return res.download(path)
}

export const getFiles = async (req, res) => {
    let files = await db.file.findMany({
        where: {
            userId: req.user.id
        }
    })
    return res.json({ message: "get files", num_files: files.length, files })
}