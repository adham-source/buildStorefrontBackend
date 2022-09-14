import { Router } from "express";
import ProductsController from "../../controllers/products";
import verifyAuthToken from "../../middlewares/verifyAuthToken";

const router = Router()

const Controller = new ProductsController()

router.get("/", Controller.getProducts)
router.get("/:id", Controller.getProduct)
router.post("/", verifyAuthToken, Controller.createProduct)


export default router

