const { createServer } = require('http');
const { parse } = require('url');

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

const ERROR_RESPONSES = {
  204: { status: "No Content" },
  403: {
    error: "Forbidden",
    message: "Access denied",
    details: "You don't have permission to access this resource"
  },
  404: {
    error: "Not Found",
    message: "User not found",
    details: "The requested user does not exist"
  },
  502: {
    error: "Bad Gateway",
    message: "Server error",
    details: "Unable to process your request due to server issues"
  }
};

const server = createServer((req, res) => {
  const { pathname } = parse(req.url);
  
  // Extract user ID from path
  const userId = pathname.split('/').pop();
  
  if (pathname.startsWith('/users/')) {
    if (userId === '1') {
      // Success response for user ID 1
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(SUCCESS_RESPONSE));
    } else if (userId === '204') {
      // No content response
      res.writeHead(204);
      res.end();
    } else if (userId === '403') {
      // Forbidden response
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(ERROR_RESPONSES[403]));
    } else if (userId === '404') {
      // Not found response
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(ERROR_RESPONSES[404]));
    } else if (userId === '502') {
      // Bad gateway response
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(ERROR_RESPONSES[502]));
    } else {
      // Default not found for other IDs
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(ERROR_RESPONSES[404]));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});

module.exports = server;