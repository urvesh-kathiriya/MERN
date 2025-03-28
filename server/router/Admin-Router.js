import { Router } from "express";
import { getallcontact, getallusers } from "../controller/Admin-Controller.js";
import {dataMiddleware} from "../middleware/data-middleware.js";
import { adminmiddleware } from "../middleware/Admin-Middleware.js";
const AdminRouter = Router();


AdminRouter.route("/users").get(dataMiddleware,adminmiddleware,getallusers);
AdminRouter.route("/contact").get(dataMiddleware,adminmiddleware,getallcontact);

export default AdminRouter;