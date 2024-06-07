const {Sequelize}=require('sequelize');
const {User}=require('../models/UserModel');
const app=require('../index');
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
    let search='test';
    let userId=1;

    test('Fetch All Users', async () => {
        const response = await fetch(`http://localhost:3000/api/v1/user/fetch/all-list?search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log("data",data)
        expect(data.code).toBe(200);
        expect(data.message).toBe('Users Fetched Successfully');
    }, 10000);

    test('Fetch By User Id', async () => {
        const response = await fetch(`http://localhost:3000/api/v1/user/fetch?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log("data",data)
        expect(data.code).toBe(200);
        expect(data.message).toBe('User Fetched Successfully');
    }, 10000);

});