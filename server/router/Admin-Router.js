import { Router } from "express";
import { getallusers } from "../controller/Admin-Controller.js";
const AdminRouter = Router();


AdminRouter.route("/users").get(getallusers);

export default AdminRouter;