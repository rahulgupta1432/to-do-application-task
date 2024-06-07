const request = require('supertest');
const app = require('../index'); // Assuming you export your Express app from index.js

describe('Task Controller', () => {
    let token;
    let userId;
    let search='test';
    let taskId=1;
    // Assuming you have a function to generate JWT token for authentication
    beforeAll(async () => {
        // Assuming you have a login route to get the token
        const loginResponse = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'rahulkumar058790@gmail.com',
                password: 'Rahul@123'
            });

        token = loginResponse.body.data[0].token;
        userId=loginResponse.body.data[0].id;

    });

    test('User Add New Task', async () => {
        const response = await fetch(`http://localhost:3000/api/v1/task/add?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Test Task',
                description: 'Test Description',
                completed: false
            })
        });

        const data = await response.json();
        console.log("data",data)
        expect(data.code).toBe(200);
        expect(data.message).toBe('Task Created Successfully');
    }, 10000);
    

    test('fetch All Tasks', async () => {
        const response = await fetch(`http://localhost:3000/api/v1/task/fetch/all-list?userId=${userId}&search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        expect(data.code).toBe(200);
        expect(data.message).toBe('Tasks Fetched Successfully');
    }, 10000);


    test('User Update Task', async () => {
        const response = await fetch(`http://localhost:3000/api/v1/task/update?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId:taskId,
                title: 'Test Task',
                description: 'Test Description',
                completed: true
            })
        });

        const data = await response.json();
        expect(data.code).toBe(200);
        expect(data.message).toBe('Task Updated Successfully');
    }, 10000);


    // test('User Delete Task', async () => {
    //     const response = await fetch(`http://localhost:3000/api/v1/task/delete?taskId=${taskId}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     const data = await response.json();
    //     expect(data.code).toBe(200);
    //     expect(data.message).toBe('Task Deleted Successfully');
    // }, 10000);

    test('Admin fetch All Users Tasks', async () => {
        const response = await fetch(`http://localhost:3000/api/v1/task/fetch/all-user-task?userId=${userId}&search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        expect(data.code).toBe(200);
        expect(data.message).toBe('Tasks Fetched Successfully');
    }, 10000);

    test('Admin fetch All Tasks List', async () => {
        const response = await fetch(`http://localhost:3000/api/v1/task/fetch/all-task-list?search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        expect(data.code).toBe(200);
        expect(data.message).toBe('Tasks Fetched Successfully');
    }, 10000);

    test('Admin Assign New Task to User', async () => {
        const response = await fetch(`http://localhost:3000/api/v1/task/assign-task?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                mobile:'9967729871',
                title: 'Test Task',
                description: 'Test Description',
                completed: false
            })
        });

        const data = await response.json();
        expect(data.code).toBe(200);
        expect(data.message).toBe('Task Assign to the User Successfully');
    }, 10000);


    // Write similar tests for other routes like /update, /delete, /toggle, /fetch/all-user-task, /fetch/all-task-list, /assign-task

    afterAll(async () => {
        // Cleanup tasks or any other resources if necessary
    });
});
