const { test, expect } = require('@playwright/test');
const axios = require('axios');

const MOCK_URL = 'http://127.0.0.1:3001';


const SUCCESS_RESPONSE = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  phone: "+1-555-123-4567",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipcode: "10001",
    country: "USA"
  },
  company: {
    name: "Doe Enterprises",
    industry: "Technology",
    position: "Software Engineer"
  },
  dob: "1990-05-15",
  profile_picture_url: "https://example.com/images/johndoe.jpg",
  is_active: true,
  created_at: "2023-01-01T12:00:00Z",
  updated_at: "2023-10-01T12:00:00Z",
  preferences: {
    language: "en",
    timezone: "America/New_York",
    notifications_enabled: true
  }
};

test.describe('Mock API Tests', () => {
  test.beforeAll(async () => {
    try {
      await axios.get(`${MOCK_URL}/`);
    } catch (error) {
      console.error('Mock server not available:', error.message);
      process.exit(1);
    }
  });

  test('GET / - should return available endpoints', async () => {
    const response = await axios.get(MOCK_URL);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      status: 'running',
      endpoints: {
        getUser: 'GET /users/:id',
        testErrors: 'GET /users/:id?status=[204|403|404|502]'
      }
    });
  });

  test('GET /users/1 - should return full user data with status 200', async () => {
    const response = await axios.get(`${MOCK_URL}/users/1`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(SUCCESS_RESPONSE);
  });

  test('GET /users/999?status=204 - should return status 204 No Content', async () => {
    const response = await axios.get(`${MOCK_URL}/users/999?status=204`, { 
      validateStatus: status => true 
    });
    expect(response.status).toBe(204);
    expect(response.data).toBe('');
  });

  test('GET /users/999?status=403 - should return 403 Forbidden', async () => {
    const response = await axios.get(`${MOCK_URL}/users/999?status=403`, { 
      validateStatus: status => true 
    });
    expect(response.status).toBe(403);
    expect(response.data).toEqual({
      error: "Forbidden",
      details: "Access denied",
      timestamp: expect.any(String)
    });
  });

  test('GET /users/999 - should return 404 Not Found by default', async () => {
    const response = await axios.get(`${MOCK_URL}/users/999`, { 
      validateStatus: status => true 
    });
    expect(response.status).toBe(404);
    expect(response.data).toEqual({
      error: "Not Found",
      details: "User with id 999 not found",
      timestamp: expect.any(String)
    });
  });

  test('GET /users/999?status=502 - should return 502 Bad Gateway', async () => {
    const response = await axios.get(`${MOCK_URL}/users/999?status=502`, { 
      validateStatus: status => true 
    });
    expect(response.status).toBe(502);
    expect(response.data).toEqual({
      error: "Bad Gateway",
      details: "Server is temporarily unavailable",
      timestamp: expect.any(String)
    });
  });

  test('GET /nonexistent - should return 404 for unknown routes', async () => {
    const response = await axios.get(`${MOCK_URL}/nonexistent`, { 
      validateStatus: status => true 
    });
    expect(response.status).toBe(404);
    expect(response.data).toEqual({
      error: "Endpoint not found",
      details: expect.stringContaining("not implemented"),
      timestamp: expect.any(String)
    });
  });
});