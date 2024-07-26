const Joi = require('joi');
const {JoiException,HttpException} = require('../error');

exports.signupValidation = async (req, res, next) => {
    const schema = Joi.object({
        name:Joi.string().max(15).required(),
        email:Joi.string().email().max(15).required(),
        password:Joi.string().min(4).max(15).required(),
    })
    const { error, value } = await schema.validate(req.body);
    console.log("error...................",value);
    if (error) {
      return res.status(400).json({ message: error?.details[0]?.message });
    }
    return next();
}

exports.loginValidation = async (req, _, next) => {
    const schema = Joi.object.key({
        name:Joi.string().max(15).required(),
        email:Joi.string().email().max(15).required(),
        password:Joi.string().min(4).max(15).required(),
    })
    const { error,value } =await schema?.validateAsync(req.body);
    if (error) {
        return next(new Error("not validated"))
    }
    return next();
}