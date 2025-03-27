import { Router } from "express";
import {home,homepost} from "../controller/auth-controller.js";
const AuthRouter = Router()


AuthRouter.route("/").get(home).post(homepost)

export default AuthRouter;