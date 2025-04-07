import Contact from "../Model/Contact-Model.js";
import Services from "../Model/Services-Model.js";
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
        const contact = await Contact.find().select({ __v: 0, updatedAt: 0, createdAt: 0 });
        if (!contact && contact.length === 0) return res.status(404).json({ message: "No contact found" });
        res.status(200).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getallservices = async (req, res) => {
    try {
        const services = await Services.find().select({ __v: 0, updatedAt: 0, createdAt: 0 });
        if (!services && services.length === 0) return res.status(404).json({ message: "No services found" });
        res.status(200).json(services);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteusers = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }


}

export const updateusers = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}




export const deletecontacts = async(req,res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.status(200).json({ message: "Contact deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updatecontacts = async(req,res) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact updated successfully', user: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}
export const deleteservices = async(req,res) => {
    try {
        const { id } = req.params
        const services = await Services.findByIdAndDelete(id);
        if (!services) return res.status(404).json({ message: "Services not found" });
        res.status(200).json({ message: "Services deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateservices = async(req,res) => {

    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const updatedServices = await Services.findByIdAndUpdate(id, data, { new: true, runValidators: true });

        if (!updatedServices) {
            return res.status(404).json({ message: 'Services not found' });
        }

        res.status(200).json({ message: 'Services updated successfully', user: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}