const textService = require('../text-service');
const { v4: uuidv4 } = require('uuid');

class Order {
    constructor(id, dishName, status) {
        this.id = id;
        this.dishName = dishName;
        this.status = status;
    }
}
// OrdersModel implements all methods for orders
class OrdersModel {
    // postOrder creates single order
    postOrder(body) {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb('db/orders.json');
            const parsedData = JSON.parse(dbData);

            const order = new Order(
                uuidv4(),
                body.dishName,
                body.status
            )
            parsedData.orders.push(order)
            textService.writeDataToDb('db/orders.json', JSON.stringify(parsedData));
            resolve({ message: "Order successful" })
        })
    }

    // putOrder updates order by specific id
    putOrder(id, body) {
        return new Promise((resolve, reject) => {
            const dbData = textService.readDataFromDb('db/orders.json');
            const parsedData = JSON.parse(dbData);
            const order = parsedData.orders.find(o => o.id === id);

            if (!order) {
                return resolve({ message: "No such order" });
            }

            parsedData.orders.forEach(order => {
                if (order.id === id) {

                    if (body.dishName) {
                        order.dishName = body.dishName
                    }

                    if (order.status) {
                        order.status = body.status
                    }
                }

            });

            textService.writeDataToDb('db/orders.json', JSON.stringify(parsedData));
            resolve({ message: "Order successfully updated" });
        })
    }

}

module.exports = OrdersModel;