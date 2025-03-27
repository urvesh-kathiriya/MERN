import { Router } from "express";
import { ServicesController } from "../controller/Services-Controller.js";
const ServicesRouter = Router()

ServicesRouter.route("/").get(ServicesController)


export default ServicesRouter;