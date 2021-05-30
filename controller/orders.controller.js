const OrdersModel = require('../model/orders.model');
const ordersModel = new OrdersModel();

class OrdersController {
    postOrders(order) {
        return ordersModel.postOrder(order);
    }

    putOrder(id, body) {
        return ordersModel.putOrder(id, body);
    }
}

module.exports = OrdersController;