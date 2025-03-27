import { Router } from "express";
import { home ,register,login, data } from "../controller/User-Controller.js";
import { dataMiddleware } from "../middleware/data-middleware.js";

const UserRouter = Router()

UserRouter.route("/").get(home)
UserRouter.route("/register").post(register)
UserRouter.route("/login").post(login)
UserRouter.route("/data").get(dataMiddleware,data)


export default UserRouter