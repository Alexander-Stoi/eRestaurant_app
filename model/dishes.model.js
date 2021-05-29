const textService = require('../text-service');

class DishesModel {
    getDish() {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb('/db/dishes.json');
            const parsedData = JSON.parse(dbData);
            const dishes = parsedData.dishes;

            resolve(dishes);
        })
    }
}

module.exports = DishesModel;