import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true

        },
        message: {
            type: String
        }
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
