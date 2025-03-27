import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        User_name: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        },
        Number: {
            type: String,
            required: true

        },
        Email: {
            type: String,
            required: true,
            unique: true

        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
