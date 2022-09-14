import { Router } from 'express';
import usersRouter from './api/users';
import productsRouter from './api/products';
import ordersRouter from './api/orders';

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export default router;
