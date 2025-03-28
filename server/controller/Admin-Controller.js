import Contact from "../Model/Contact-Model.js";
import UserModel from "../Model/User-Model.js";

export const getallusers = async (req, res) => {
    try {
        const users = await UserModel.find().select({ Password: 0, __v: 0, updatedAt: 0, createdAt: 0 });
        if (!users && users.length === 0) return res.status(404).json({ message: "No users found" });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getallcontact = async (req, res) => {
    try {
        const contact = await Contact.find().select({__v: 0, updatedAt: 0,createdAt: 0});
        if (!contact && contact.length === 0) return res.status(404).json({ message: "No contact found" });
        res.status(200).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
