const { test, expect } = require('@playwright/test');
const axios = require('axios');
const mockServer = require('../mocks/example-api-mock');

test.describe('Example API Mock Tests', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeAll(async () => {
    // Mock server is already started by the mock file
  });

  test.afterAll(async () => {
    // Close the mock server
    mockServer.close();
  });

  test('GET /users/1 - validate successful response structure', async () => {
    const response = await axios.get(`${BASE_URL}/users/1`);
    
    expect(response.status).toBe(200);
    const data = response.data;
    
    // Check top-level fields
    expect(data).toHaveProperty('id');
    expect(typeof data.id).toBe('number');
    expect(data).toHaveProperty('name');
    expect(typeof data.name).toBe('string');
    expect(data).toHaveProperty('email');
    expect(typeof data.email).toBe('string');
    expect(data).toHaveProperty('username');
    expect(typeof data.username).toBe('string');
    
    // Check nested address object
    expect(data).toHaveProperty('address');
    expect(typeof data.address).toBe('object');
    expect(data.address).toHaveProperty('street');
    expect(data.address).toHaveProperty('city');
    expect(data.address).toHaveProperty('state');
    expect(data.address).toHaveProperty('zipcode');
    expect(data.address).toHaveProperty('country');
    
    // Check nested company object
    expect(data).toHaveProperty('company');
    expect(typeof data.company).toBe('object');
    expect(data.company).toHaveProperty('name');
    expect(data.company).toHaveProperty('industry');
    expect(data.company).toHaveProperty('position');
    
    // Check preferences
    expect(data).toHaveProperty('preferences');
    expect(typeof data.preferences).toBe('object');
    expect(data.preferences).toHaveProperty('language');
    expect(data.preferences).toHaveProperty('timezone');
    expect(data.preferences).toHaveProperty('notifications_enabled');
    expect(typeof data.preferences.notifications_enabled).toBe('boolean');
  });

  test('GET /users/204 - validate no content response', async () => {
    const response = await axios.get(`${BASE_URL}/users/204`, {
      validateStatus: function (status) {
        return status === 204; // Accept 204 status without throwing
      }
    });
    
    expect(response.status).toBe(204);
    expect(response.data).toBe('');
  });

  test('GET /users/403 - validate forbidden response structure', async () => {
    try {
      await axios.get(`${BASE_URL}/users/403`);
    } catch (error) {
      expect(error.response.status).toBe(403);
      const data = error.response.data;
      
      expect(data).toHaveProperty('error');
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('details');
      expect(data.error).toBe('Forbidden');
    }
  });

  test('GET /users/404 - validate not found response structure', async () => {
    try {
      await axios.get(`${BASE_URL}/users/404`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      const data = error.response.data;
      
      expect(data).toHaveProperty('error');
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('details');
      expect(data.error).toBe('Not Found');
    }
  });

  test('GET /users/502 - validate bad gateway response structure', async () => {
    try {
      await axios.get(`${BASE_URL}/users/502`);
    } catch (error) {
      expect(error.response.status).toBe(502);
      const data = error.response.data;
      
      expect(data).toHaveProperty('error');
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('details');
      expect(data.error).toBe('Bad Gateway');
    }
  });

  test('GET /users/999 - validate default not found response', async () => {
    try {
      await axios.get(`${BASE_URL}/users/999`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      const data = error.response.data;
      
      expect(data).toHaveProperty('error');
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('details');
      expect(data.error).toBe('Not Found');
    }
  });
});