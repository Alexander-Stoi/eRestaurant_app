const router = require('express').Router();
const { response } = require('express');
const UserController = require('../controller/user.controller');
const userController = new UserController();
const joi = require('joi');
const bcrypt = require('bcrypt');
// const jwt = require(`jsonwebtoken`);


router.post('/register', async (req, res) => {
    const body = req.body;
    const schema = joi.object(
        {
            username: joi.string().min(4).required(),
            password: joi.string().min(4).required(),
            type: joi.string().valid('admin', 'user').required()
        }
    )

    const validation = schema.validate(body);

    if (validation?.error) {
        return res.status(400).send({
            message: validation.error.details[0].message,
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;


    userController.registerUser(body).then((response) => {
        res.status(200).json(response);
    })
})





router.post('/login', async (req, res) => {
    const body = req.body;
    const schema = joi.object(
        {
            username: joi.string().min(4).required(),
            password: joi.string().min(4).required()
        }
    );
    const validation = schema.validate(body);

    if (validation?.error) {
        return res.status(400).send({ message: 'Incorrect credentials' })
    }

    userController.loginUser(body).then((response) => {


        res.status(200).json(response);
    })
})


module.exports = router;

