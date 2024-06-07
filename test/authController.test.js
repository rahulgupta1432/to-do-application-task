const { Sequelize } = require('sequelize');
const { User } = require('../models/UserModel');
const app = require('../index');
const { server } = require('../index');
const fetch = require('node-fetch');
require('dotenv').config();
describe('Auth test suite', () => {
    // Initialize Sequelize
    const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: '',
        database: process.env.DB_NAME,
    });
    

    beforeAll(async () => {
        // Connect to the database
        await sequelize.authenticate();

        // Delete users with email "test@example.com"
        // await User.destroy({
        //     where: {
        //         email: 'test@example.com'
        //     }
        // });
    });

    afterAll(async () => {
        // Disconnect Sequelize and close the server
        await sequelize.close();
    });

    test('Register', async () => {
        const response = await fetch('http://localhost:3000/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Rahul Kumar',
                email: 'test3@example.com',
                password: 'Rahul@123',
                isAdmin: true,
                mobile: '1234567890'
            })
        });

        const data = await response.json();
        console.log("code",data.code);

        expect(data.code).toBe(200);
        expect(data.message).toBe('User Register Successfully');
        // Delete users with email "test@example.com"
        
    }, 10000);

    
    test('Login', async () => {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'rahulkumar058790@gmail.com',
                password: 'Rahul@123'
            })
        });

        const data = await response.json();
        console.log(data.code);

        expect(data.code).toBe(200);
        expect(data.message).toBe('User Login Successfully');
    }, 10000);
});
