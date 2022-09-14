import { Router } from "express";
import UsersController from "../../controllers/users";
import verifyAuthToken from "../../middlewares/verifyAuthToken";
const router = Router()

const Controller = new UsersController()


router.get('/', verifyAuthToken, Controller.getUsers)
router.get('/:id', verifyAuthToken, Controller.getUser)

router.delete("/:id", verifyAuthToken, Controller.deleteUser)

router.post('/register', Controller.createUser)
router.post('/login', Controller.authUser)



export default router