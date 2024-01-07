import settings from '../settings.js'
import db from '../database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// generate a open comment for the swagger docs


const registerUser = async (req, res) => {
    const { password, repassword } = await req.body
    if (password !== repassword) return res.status(400).json({ "error": "Passwords do not match" })
    const { repassword: _, ...userToSave } = req.body
    let userExists = await verifyUserExists(userToSave.email)
    if (!userExists) {
        let userDB = await createUser(userToSave)
        return res.status(201).json({
            "message": "User registered successfully",
            "user": userDB
        })
    }
    return res.status(400).json({
        "message": "User already exists",
    })
}

const loginUser = async (req, res) => {
    const { email, password } = await req.body
    let userExists = await verifyUserExists(email)
    if (!userExists) return res.status(400).json({ "error": "Invalid credentials" })
    let token = await autenticate(email, password)
    if (!token) return res.status(400).json({ "error": "Invalid credentials" })

    return res.status(200).json({
        "message": "User logged in successfully",
        "token": token
    })
}

const autenticate = async (email, password) => {
    let userDB = await db.user.findUnique({ where: { email: email } });
    let match = await bcrypt.compare(password, userDB.password);
    if (!match) return null;
    const { password: _, ...payload } = userDB;
    const token = jwt.sign(payload, settings.JWT_KEY_SECRET, { expiresIn: settings.JWT_TOKEN_EXPIRES_IN });
    return token
}

const verifyUserExists = async (email) => {
    let userDB = await db.user.findUnique({
        where: {
            email: email
        }
    })

    // TODO: verify if user comfirmed email
    if (userDB) return true
    return false
}

const createUser = async (userToSave) => {
    userToSave.password = await bcrypt.hash(userToSave.password, bcrypt.genSaltSync(10))
    let newUser = await db.user.create({ data: userToSave })
    const { password: nope1, superUser: nope2, ...userDB } = newUser
    return userDB
}

export {
    registerUser,
    loginUser
}