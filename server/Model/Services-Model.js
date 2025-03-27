import mongoose from "mongoose";



const servicesSchema = new mongoose.Schema(
    {
        service: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        provider:{ type: String, required: true }
    },
    {
        timestamps: true,
    }
);
const Services = mongoose.model("Service", servicesSchema);

export default Services;
