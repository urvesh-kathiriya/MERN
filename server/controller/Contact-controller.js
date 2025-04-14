import Contact from "../Model/Contact-Model.js"
import jwt from 'jsonwebtoken';


export const home = async (req, res) => {
    try {
        const token = req.header("authToken").replace("Bearer", "").trim();
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const skip = (page - 1) * limit;

        const contact = await Contact.find({ email: verified.Email }).skip(skip).limit(limit);

        const total = await Contact.find({ email: verified.Email }).countDocuments();
        res.status(200).json({ page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            data: contact });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const homepost = async (req, res) => {
    const { username, email, message } = req.body;
    try {


        const newContact = new Contact({
            username, email, message
        });

        await newContact.save();
        res.json({ message: "Contact added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving contact", error });
    }
}

