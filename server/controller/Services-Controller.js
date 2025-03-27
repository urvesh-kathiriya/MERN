import Services from "../Model/Services-Model.js"

export const ServicesController = async(req, res) => {

    try {
        const services =await Services.find();
        res.status(200).json(services);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
   
}
