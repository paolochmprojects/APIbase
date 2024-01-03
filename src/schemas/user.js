import Joi from "joi";

export const userRegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%&*]{3,30}$')).required(),
    repassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%&*]{3,30}$')).required(),
    name: Joi.string().min(3).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%&*]{3,30}$')).required(),
});