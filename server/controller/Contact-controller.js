import Contact from "../Model/Contact-Model.js"

export const home = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const homepost =  async (req, res) => {
    const { username,email,message } = req.body;
    try {


        const newContact = new Contact({
            username,email,message
        });

        await newContact.save();
        res.json({ message: "Contact added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving contact", error });
    }
}

