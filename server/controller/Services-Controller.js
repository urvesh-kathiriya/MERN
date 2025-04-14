import Services from "../Model/Services-Model.js"

export const ServicesController = async(req, res) => {

    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 6; 
    
        const skip = (page - 1) * limit;
    
        const users = await Services.find().skip(skip).limit(limit);
    
        const total = await Services.countDocuments();
    
        res.json({
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          data: users
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    
   
}
