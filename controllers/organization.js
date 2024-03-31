const Organization = require('../models/Organization');

// Controller for creating a new organization
const createOrganization = async (req, res) => {
    try {
        // Extract organization details from the request body
        const { name } = req.body;

        // Create a new organization instance
        const newOrganization = new Organization({
            name
        });

        // Save the new organization to the database
        await newOrganization.save();

        // Return a success message along with the added organization
        res.status(201).json({ message: 'Organization created successfully', organization: newOrganization });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to create organization', error: error.message });
    }
};

// Controller for retrieving all organizations
const getAllOrganizations = async (req, res) => {
    try {
        // Retrieve all organizations from the database
        const organizations = await Organization.find();

        // Return the list of organizations
        res.status(200).json({ organizations });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to fetch organizations', error: error.message });
    }
};

// Controller for updating an organization
const updateOrganization = async (req, res) => {
    try {
        // Extract organization ID and update details from the request body
        const { id } = req.query;
        const updateData = req.body;

        // Update the organization in the database
        const updatedOrganization = await Organization.findByIdAndUpdate(id, updateData, { new: true });

        // Return a success message along with the updated organization
        res.status(200).json({ message: 'Organization updated successfully', organization: updatedOrganization });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to update organization', error: error.message });
    }
};

// Controller for deleting an organization
const deleteOrganization = async (req, res) => {
    try {
        // Extract organization ID from the request parameters
        const { id } = req.query;

        // Delete the organization from the database
        await Organization.findByIdAndDelete(id);

        // Return a success message
        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to delete organization', error: error.message });
    }
};

module.exports = {
    createOrganization,
    getAllOrganizations,
    updateOrganization,
    deleteOrganization
};
