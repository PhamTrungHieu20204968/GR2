const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/OrdersController');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post('/user', validateToken, ordersController.userCreateOrder);
router.post('/', ordersController.guestCreateOrder);
router.put('/:id', validateToken, ordersController.updateOrder);
router.get('/user', validateToken, ordersController.getUserOrder);
router.get('/statistics', validateToken, ordersController.getStatistics);
router.get('/top-sale', validateToken, ordersController.getTopSale);
router.get('/:id', ordersController.getOneOrder);
router.get('/', validateToken, ordersController.getAllOrders);
module.exports = router;
