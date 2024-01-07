import jwt from 'jsonwebtoken'
import settings from '../settings.js'
import db from '../database.js'

export const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization
    if (!token) return res.status(403).json({ "error": "Unauthorized" })
    token = token.split(" ")[1]
    try {
        req.user = jwt.verify(token, settings.JWT_KEY_SECRET)
        let userDB = await db.user.findUnique({ where: { id: req.user.id } })
        if (!userDB) return res.status(403).json({ "error": "Token invalidd" })
        const { password: _, ...user } = userDB
        req.user = user
    } catch (error) {
        return res.status(403).json({ "error": "Token invalid" })
    }
    next()
}
