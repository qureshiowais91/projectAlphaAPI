const mongoose  = require("mongoose")

const getPaginatedResults = (model) => {
    return async (req, res, next) => {
      try {
        const { page = 1, limit = 10, ...filters } = req.query;
  
        // Parse filter parameters
        const filter = {};
        for (const key in filters) {
          // Check if the key is valid and not pagination parameters
          if (filters.hasOwnProperty(key) && key !== 'page' && key !== 'limit') {
            // Handle special cases like 'parent', 'school', and 'teacher'
            if (key === 'parent' || key === 'school' || key === 'teacher') {
              filter[key] = new mongoose.Types.ObjectId(filters[key]); // Convert to ObjectId
            } else {
              filter[key] = { $regex: new RegExp(filters[key], 'i') }; // Case-insensitive search
            }
          }
        }
  
        // Query the database
        const results = await model
          .find(filter)
          .limit(limit * 1) // Convert limit to a number and apply it
          .skip((page - 1) * limit); // Skip appropriate number of documents for pagination
  
        // Get total count for pagination
        const count = await model.countDocuments(filter);
  
        res.paginatedResults = {
          results,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        };
        next();
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };
  };
  
  module.exports = getPaginatedResults;
  