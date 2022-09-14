import { Router } from "express";
import OrdersController from "../../controllers/orders";
import verifyAuthToken from "../../middlewares/verifyAuthToken";

const router = Router()
const Controller = new OrdersController()

router.post("/", verifyAuthToken ,Controller.createOrder)
router.get("/:userId", verifyAuthToken, Controller.getOrdersByUserId)
router.post("/:id/products", verifyAuthToken, Controller.addProduct)
export default router