# Automated-Software-Tests

## Project Description
This project implements API testing for:
1. DemoQA Bookstore API (Task 1)
2. Mock User API Server (Task 2)

## Installation
```bash
npm install
Running the Mock Server
bash
npm run mock
Server runs on: http://localhost:3001

API Endpoints
Mock Server Endpoints
GET / - Server status

GET /users/:id - Get user by ID

/users/1 - Successful response (200)

/users/999?status=204 - No Content (204)

/users/999?status=403 - Forbidden (403)

/users/999 - Not Found (404, default)

/users/999?status=502 - Bad Gateway (502)

DemoQA API Endpoints
POST /Account/v1/User - Create user

POST /Account/v1/GenerateToken - Generate token

GET /Account/v1/User/{UUID} - Get user info

DELETE /Account/v1/User/{UUID} - Delete user

Testing
Run Mock API Tests
bash
npm run test:mock-run
Run DemoQA API Tests
bash
npm run test:api
Example Requests
Mock Server Examples
bash
# Successful response
curl http://localhost:3001/users/1

# Error responses
curl http://localhost:3001/users/999?status=403
curl http://localhost:3001/users/999?status=502

# Not found
curl http://localhost:3001/nonexistent
Test Coverage
Positive/Negative test scenarios

Response structure validation

Error handling

Test isolation

Project Structure
text
/tests
  demoqa-api.spec.js   # DemoQA API tests
  mock-api-tests.spec.js # Mock API tests
/mocks
  mock-server.js       # Mock API server
Dependencies
axios: ^1.6.7

express: ^4.21.2

@playwright/test: ^1.42.1