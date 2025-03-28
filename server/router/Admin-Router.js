import { Router } from "express";
import { getallcontact, getallservices, getallusers } from "../controller/Admin-Controller.js";
import {dataMiddleware} from "../middleware/data-middleware.js";
import { adminmiddleware } from "../middleware/Admin-Middleware.js";
const AdminRouter = Router();


AdminRouter.route("/users").get(dataMiddleware,adminmiddleware,getallusers);
AdminRouter.route("/contacts").get(dataMiddleware,adminmiddleware,getallcontact);
AdminRouter.route("/services").get(dataMiddleware,adminmiddleware,getallservices);

export default AdminRouter;