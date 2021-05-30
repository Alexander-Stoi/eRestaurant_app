const DishesModel = require('../model/dishes.model');
const dishesModel = new DishesModel();

class DishesController {
    getDishes() {
        return dishesModel.getDishes();
    }

    getDish(id) {
        return dishesModel.getDish(id);
    }

    postDish(body) {
        return dishesModel.postDish(body);
    }
    putDish(id, body) {
        return dishesModel.putDish(id, body);
    }
}

module.exports = DishesController;