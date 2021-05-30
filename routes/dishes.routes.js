const router = require('express').Router();
const DishesController = require('../controller/dishes.controller');
const dishesController = new DishesController();
const joi = require('joi');
const { response } = require('express');
const sessionValidator = require('../sessionValidator.const');

// GET /dishes returns all the dishes from db
router.get('/', sessionValidator.validate, (req, res) => {
    dishesController.getDishes().then((response) => {
        res.status(200).json(response);
    })
})

// GET /dishes/{id} returns single dish for specific dish_id from db
router.get('/:id?', sessionValidator.validate, (req, res) => {
    const id = req.params.id;

    // validate input params
    const schema = joi.string().required()
    const validation = schema.validate(id);

    if (validation?.error) {
        return res.status(400).send({ message: validation.error.details[0].message })
    }

    dishesController.getDish(id).then((response) => {
        res.status(200).json(response);
    })

})

// POST /dishes creates a new dish
router.post('/', sessionValidator.validateAdmin, (req, res) => {
    const body = req.body;

    const schema = joi.object({
        name: joi.string().required(),
        price: joi.number().required()
    })

    // validate input params
    const validation = schema.validate(body);
    if (validation?.error) {
        return res.status(400).send({ message: validation.error.details[0].message })
    }

    dishesController.postDish(body).then((response) => {
        res.status(200).json(response)
    })
})

router.put('/:id?', sessionValidator.validateAdmin, (req, res) => {
    const body = req.body;
    const id = req.params.id;

    // validate param
    const schemaParam = joi.string().required();
    
    const validationParam = schemaParam.validate(id);
    if (validationParam?.error) {
        return res.status(400).send({ message: validationParam.error.details[0].message })
    }

    // validate body
    const schemaBody = joi.object({
        name: joi.string(),
        price: joi.number()
    });
    const validationBody = schemaBody.validate(body);
    if (validationBody?.error) {
        return res.status(400).send({ message: validationBody.error.details[0].message })
    }

    dishesController.putDish(id, body).then((response) => {
        res.status(200).json(response);
    })


})

module.exports = router;