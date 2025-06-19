const express = require('express');
const app = express();
app.use(express.json());


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.get('/', (req, res) => {
    res.json({
        status: 'running',
        endpoints: {
            getUser: 'GET /users/:id',
            testErrors: 'GET /users/:id?status=[204|403|404|502]'
        }
    });
});


app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
   
    if (id === 1) {
        return res.status(200).json({
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
        });
    }

    
    const statusCodes = {
        '204': () => res.status(204).end(),
        '403': () => res.status(403).json({ 
            error: "Forbidden",
            details: "Access denied",
            timestamp: new Date().toISOString()
        }),
        '404': () => res.status(404).json({
            error: "Not Found",
            details: `User with id ${id} not found`,
            timestamp: new Date().toISOString()
        }),
        '502': () => res.status(502).json({
            error: "Bad Gateway",
            details: "Server is temporarily unavailable",
            timestamp: new Date().toISOString()
        })
    };

    const selectedCode = req.query.status;
    if (selectedCode && statusCodes[selectedCode]) {
        return statusCodes[selectedCode]();
    }

    
    res.status(404).json({ 
        error: "Not Found",
        details: `User with id ${id} not found`,
        timestamp: new Date().toISOString()
    });
});


app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        details: `Route ${req.method} ${req.url} not implemented`,
        timestamp: new Date().toISOString()
    });
});


const PORT = process.env.PORT || 3001;


const server = app.listen(PORT, '0.0.0.0', () => {
    const address = server.address();
    console.log(`
    Mock server running on:
    - http://localhost:${PORT}
    - http://127.0.0.1:${PORT}
    Network: http://${getLocalIp()}:${PORT}
    `);
});


function getLocalIp() {
    const interfaces = require('os').networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}


server.on('error', (err) => {
    console.error('Server error:', err.message);
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        console.error('Try:');
        console.error(`1. kill process using port ${PORT}`);
        console.error(`2. Change PORT number in .env file`);
    }
    process.exit(1);
});


process.on('SIGINT', () => {
    console.log('\nShutting down server gracefully...');
    server.close(() => {
        console.log('Server stopped');
        process.exit(0);
    });
});