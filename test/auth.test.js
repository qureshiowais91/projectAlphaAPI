const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Test cases for register endpoint
describe('auth', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(DATABASE_URL);
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }

        await User.deleteMany({});
    },10000);


    test('It should register a new user', async () => {
        const newUser = {
            email: 'newuser1@example.com',
            password: 'newpassword123',
            role: 'admin',
        };
        // Send a POST request to register a new user
        const response = await request(app).post('/api/auth/register').send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');

    });

    test('It should log in an existing user', async () => {
        const existingUser = {
            email: 'newuser1@example.com',
            password: 'newpassword123',
            role:"admin"
        };
        // Send a POST request to login with existing user credentials
        const response = await request(app)
            .post('/api/auth/login')
            .send(existingUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    afterAll(async () => {
        // Add any cleanup tasks here
        console.log('Cleanup completed');

    });
});


describe('POST /addTeacher', () => {
    test('should add a new teacher', async () => {
        // Define a mock teacher object
        const mockTeacher = {
            name: 'John Doe',
            subjectTaught: 'Math',
            phoneNumber: '1234567890',
            _id: '660932925fbcd4861790b9e9'
        };

        const response = await request(app)
            .post('/api/teacher')
            .send(mockTeacher);

        expect(response.status).toBe(200);
    }, 10000);

    test('should return list of teachers', async () => {
        const response = await request(app).get('/api/teachers');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.teachers)).toBe(true);
    })

});


const mongoose = require("mongoose")

describe('Organization API Endpoints', () => {
    let organizationId;

    test('should create a new organization', async () => {
        const organizationData = {
            name: 'Test Organization'
        };

        const res = await request(app)
            .post('/api')
            .send(organizationData);

        expect(res.statusCode).toEqual(201);
    });

});
