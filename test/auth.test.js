const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');

// Populate the database with dummy data before running tests


// Test cases for register endpoint
describe('TEST auth', () => {
    
    beforeAll(async () => {
        await User.deleteMany({});
    }, 10000);



    test('It should register a new user', async () => {
        const newUser = {
            email: 'newuser1@example.com',
            password: 'newpassword123',
            role: 'student',
        };
        // Send a POST request to register a new user
        const response = await request(app).post('/user/register').send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
      
    });


    test('It should log in an existing user', async () => {
        const existingUser = {
            email: 'newuser1@example.com',
            password: 'newpassword123'
        };
        // Send a POST request to login with existing user credentials
        const response = await request(app)
            .post('/user/login')
            .send(existingUser);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
    



    afterAll(async () => {
        // Add any cleanup tasks here
        console.log('Cleanup completed');
        
    });
});


