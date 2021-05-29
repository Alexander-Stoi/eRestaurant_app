const router = require('express').Router();
const DishesController = require('../controller/dishes.controller');
const dishesController = new DishesController();

router.get('/', (req, res) => {
    dishesController.getDishes().then((response) => {
        res.status(200).json(response);
    })
})

router.post('/', (req, res) => {
    const body = req.body;
    dishesController.postDishes(body).then()
})



module.exports = router;