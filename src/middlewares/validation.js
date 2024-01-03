export const validationBody = (schema) => {
    return async (req, res, next) => {
        const { error, _ } = await schema.validate(req.body) 
        if (error) {
            return res.status(400).json({
                "message": error
            })
        }
        next()
    }
}