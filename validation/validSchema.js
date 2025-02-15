const joi = require("@hapi/joi");
const { description } = require("@hapi/joi/lib/base");

const petSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    species: joi.string().required(),
    breed: joi.string().optional(),
    age: joi.number().integer().min(0).max(30).required(),
    adoption_status: joi.string().valid("available", "adopted").default("available"),
    description: joi.string().optional(),
    image: joi.string().uri().optional(),
});

const userSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().lowercase().required(),
    github_id: joi.string().optional(),
    profile_url: joi.string().uri().optional(),
    avatar_url: joi.string().uri().optional(),
    password: joi.string().min(8).max(30).required()
});

const validatePet = (req, res, next) => {
    const { error } = petSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ error: error.details[0].message });
    }
    next();
}

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validatePet,
    validateUser
};