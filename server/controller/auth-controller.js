import Product from "../Model/Product-Model.js"

export const home = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const homepost =  async (req, res) => {
    const { Product_name, Company_name, price, Image, Rating } = req.body;
    try {


        const newProduct = new Product({
            Product_name, Company_name, price, Image, Rating
        });

        await newProduct.save();
        res.json({ message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving product", error });
    }
}

