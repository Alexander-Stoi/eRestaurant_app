const router = require('express').Router();

const user = require('./routes/user.routes');
const dish = require('./routes/dishes.routes');
const order = require('./routes/orders.routes');


router.use('/users', user);
router.use('/dishes', dish);
router.use('/orders', order);




module.exports = router;