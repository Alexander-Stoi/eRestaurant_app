const DishesModel = require('../model/dishes.model');
const dishesModel = new DishesModel();

class DishesController {
    getDishes() {
        return dishesModel.getDish();
    }
}

module.exports = DishesController;