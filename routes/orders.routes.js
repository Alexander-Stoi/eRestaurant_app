const router = require('express').Router();
const OrdersController = require('../controller/orders.controller');
const ordersController = new OrdersController();
const joi = require('joi');
const { response } = require('express');

// POST /orders creates a new order
router.post('/', (req, res) => {
    const body = req.body;

    const schema = joi.object({
        dishName: joi.string().required(),
        status: joi.string().valid('New', 'Cancelled', "Done").required()
    })

    const validation = schema.validate(body);

    if (validation?.error) {
        return res.status(400).send({ message: validation.error.details[0].message });
    }

    ordersController.postOrders(body).then((response) => {
        res.status(200).json(response);
    })
})

// PUT /orders/{id} updates order by specific id
router.put('/:id?', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const schemaParams = joi.string().required();
    const validationParams = schemaParams.validate(id);

    if (validationParams?.error) {
        return res.status(400).send({ message: validationParams.error.details[0].message });
    }

    const schemaBody = joi.object({
        dishName: joi.string(),
        status: joi.string().valid('New', 'Cancelled', 'Done').required()
    })
    const validationBody = schemaBody.validate(body);

    if (validationBody?.error) {
        return res.status(400).send({ message: validationBody.error.details[0].message });
    }

    ordersController.putOrder(id, body).then((response) => {
        res.status(200).json(response);
    })


})


module.exports = router;
