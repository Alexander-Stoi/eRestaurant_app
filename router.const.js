const router = require('express').Router();

const user = require('./routes/user.routes');
const dish = require('./routes/dishes.routes');


router.use('/users', user);
router.use('/dishes', dish);




module.exports = router;