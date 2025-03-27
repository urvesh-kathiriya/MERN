import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        Product_name: {
            type: String,
            required: true
        },
        Company_name: {
            type: String
        },
        price: {
            type: Number
        },
        Image: {
            type: String 
        },
        Rating: {
            type: Number
        }
    }
);

const Product = mongoose.model("product", productSchema);

export default Product;
