const { text } = require('express');
const textService = require('../text-service');

const { v4: uuidv4 } = require('uuid');

class Dish {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = Number(price);
    }
}

// DishesModel implements all methods for dishes
class DishesModel {
    // getDishes gets all the dishes from db
    getDishes() {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb('db/dishes.json');
            const parsedData = JSON.parse(dbData);
            const dishes = parsedData.dishes;

            resolve(dishes);
        })
    }

    // getDish gets single dish by id
    getDish(id) {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb('db/dishes.json');
            const parsedData = JSON.parse(dbData);
            const dish = parsedData.dishes.find(d => d.id === id);

            if (!dish) {
                return resolve({ message: "Dish not found!" })
            }

            resolve(dish)
        })
    }

    // postDish creates single dish
    postDish(body) {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb('db/dishes.json');
            const parsedData = JSON.parse(dbData);
            const exist = parsedData.dishes.some(d => d.name === body.name)

            if (exist) {
                return resolve({ message: "Dish already exist in db!" })
            }
            const dish = new Dish(
                uuidv4(),
                body.name,
                body.price
            )
            parsedData.dishes.push(dish);

            textService.writeDataToDb('db/dishes.json', JSON.stringify(parsedData));
            resolve(dish);
        })
    }

    // putDish updates single dish by id
    putDish(id, body) {
        return new Promise(async (resolve, reject) => {

            const dbData = textService.readDataFromDb('db/dishes.json');
            const parsedData = JSON.parse(dbData);
            const dish = parsedData.dishes.find(d => d.id === id);

            if (!dish) {
                return resolve({ message: "Dish not found!" })
            }
            await parsedData.dishes.forEach(dish => {
                if (dish.id === id) {
                    if (body.name) {
                        dish.name = body.name;
                    }
                    if (body.price) {
                        dish.price = body.price;
                    }
                }
            })

            textService.writeDataToDb('db/dishes.json', JSON.stringify(parsedData));
            resolve({ message: "Successfully updated" });
        })
    }

}

module.exports = DishesModel;