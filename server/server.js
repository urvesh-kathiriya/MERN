import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/DB.js';
import cors from "cors"
import AuthRouter from './router/auth-router.js';
import UserRouter from './router/User-router.js';
import ContactRouter from "./router/Contact-Router.js"
import ServicesRouter from './router/Services-Router.js';
import AdminRouter from './router/Admin-Router.js';

//.env 
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());

//connect the databse 
ConnectDB();


app.use("/api/products",AuthRouter)
app.use("/api/users",UserRouter)
app.use("/api/contact",ContactRouter)
app.use("/api/services",ServicesRouter)
app.use("/api/admin",AdminRouter)



app.listen(port, () => console.log(`app listening on port ${port}!`));
