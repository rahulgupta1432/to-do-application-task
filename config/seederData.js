// seederData.js
const { Sequelize } = require('sequelize');
const { User } = require('../models/UserModel');
const Task  = require('../models/TaskModel');
require('dotenv').config();
const bcrypt=require('bcrypt');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: process.env.DB_NAME,
});
// sequelize.sync({alter:true})
const seedDatabase=async()=> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
   const users = await User.bulkCreate([
      {
        id:1,
        name: 'Rahul Gupta',
        email: 'rahulkumar058790@gmail.com',
        password: bcrypt.hashSync('Rahul@123',10),
        isAdmin: true,
        mobile: '1234567890'
      },
      {
        id:2,
        name: 'John Doe',
        email: 'user1@gmail.com',
        password: bcrypt.hashSync('Rahul@123',10), 
        isAdmin: false,
        mobile: '0987654321'
      }
    ]);

    // Insert Tasks
    await Task.bulkCreate([
      {
        id:1,
        userId: users.find(user => user.email === 'rahulkumar058790@gmail.com').id,
        title: 'Test Task 1',
        description: 'Description for test task 1',
        completed: false,
      },
      {
        id:2,
        userId: users.find(user => user.email === 'john.doe@example.com').id,
        title: 'Test Task 2',
        description: 'Description for test task 2',
        completed: false,
      }
    ]);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}


module.exports = seedDatabase;