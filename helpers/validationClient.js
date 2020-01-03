const Joi = require('@hapi/joi');


exports.registrationValidation =  (data) => {

    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(4)
            .max(30)
            .required(),
    
        password: Joi.string()
        .alphanum()
        .min(6)
        .required(),
    
        repeat_password: Joi.ref('password'),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });

    return schema.validate(data);
};

exports.loginValidation =  (data) => {

    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
        password: Joi.string()
        .alphanum()
        .min(6)
        .required(),
    
    });

    return schema.validate(data);
};