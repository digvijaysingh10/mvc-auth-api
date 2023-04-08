const joi = require("@hapi/joi");

const registerValidation = data => {
    const schema = {
        firstname: joi.string().min(2).required(),
        lastname: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    };
    return joi.validate(data, schema);
};
const loginValidation = data => {
    const schema = {
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    };
    return joi.validate(data, schema);
};
module.exports = { registerValidation, loginValidation }
