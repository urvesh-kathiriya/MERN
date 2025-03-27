import { Router } from "express";
import {home,homepost} from "../controller/Contact-controller.js";
const ContactRouter = Router()


ContactRouter.route("/").get(home).post(homepost)

export default ContactRouter;