const express = require('express');
const organization = express.Router();
const { createOrganization, getAllOrganizations, updateOrganization, deleteOrganization } = require('../controllers/organization');

// Create a new organization
organization.post('/', createOrganization);

// Retrieve all organizations
organization.get('/', getAllOrganizations);

// Update an organization
organization.put('/', updateOrganization);

// Delete an organization
organization.delete('/', deleteOrganization);

module.exports = { organization };
