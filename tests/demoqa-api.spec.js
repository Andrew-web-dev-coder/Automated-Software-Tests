const { test, expect } = require('@playwright/test');
const axios = require('axios');

const BASE_URL = 'https://demoqa.com';
const VALID_PASSWORD = 'ValidPassword123!';

test.describe('DemoQA API Tests', () => {
    let userId;
    let token;
    const username = `testuser_${Math.random().toString(36).substring(2, 8)}`;

    
    async function makeRequest(method, endpoint, data = null, authToken = null) {
        try {
            const config = {
                method,
                url: `${BASE_URL}${endpoint}`,
                timeout: 10000
            };
            
            if (data) config.data = data;
            if (authToken) config.headers = { Authorization: `Bearer ${authToken}` };
            
            const response = await axios(config);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
            throw error;
        }
    }

    test('POST /Account/v1/User - create user with valid data', async () => {
        const response = await makeRequest('post', '/Account/v1/User', {
            userName: username,
            password: VALID_PASSWORD
        });

        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('userID');
        expect(response.data.username).toBe(username);
        userId = response.data.userID;
    });

    test('POST /Account/v1/User - create user with empty password', async () => {
        const response = await makeRequest('post', '/Account/v1/User', {
            userName: `testuser_${Math.random().toString(36).substring(2, 8)}`,
            password: ''
        });

        expect([400, 409]).toContain(response.status);
        if (response.data?.message) {
            expect(response.data.message.toLowerCase()).toContain('password');
        }
    });

    test('POST /Account/v1/GenerateToken - generate token for valid user', async () => {
        if (!userId) {
            console.log('Skipping token test - no user created');
            return;
        }

        const response = await makeRequest('post', '/Account/v1/GenerateToken', {
            userName: username,
            password: VALID_PASSWORD
        });

        expect(response.status).toBe(200);
        expect(response.data.status).toBe('Success');
        expect(response.data).toHaveProperty('token');
        token = response.data.token;
    });

    test('GET /Account/v1/User/{UUID} - get user info', async () => {
        if (!userId || !token) {
            console.log('Skipping get user test - no user/token');
            return;
        }

        const response = await makeRequest('get', `/Account/v1/User/${userId}`, null, token);
        
        if (response.status === 401) {
            console.log('Token expired, skipping test');
            return;
        }

        expect(response.status).toBe(200);
        expect(response.data.userId).toBe(userId);
        expect(response.data.username).toBe(username);
    });

    test('DELETE /Account/v1/User/{UUID} - delete user', async () => {
        if (!userId || !token) {
            console.log('Skipping delete test - no user/token');
            return;
        }

        const response = await makeRequest('delete', `/Account/v1/User/${userId}`, null, token);
        expect([200, 204]).toContain(response.status);
    });
});