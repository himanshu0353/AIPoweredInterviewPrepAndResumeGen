const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from your frontend domain
        const allowedOrigins = [
            'http://localhost:5173', // Local development
            'http://localhost:3000',
            'https://aipoweredinterviewprepandresumegen.onrender.com',
            'https://ai-powered-interview-prep-and-resum.vercel.app', // Your Vercel frontend
            'https://your-frontend-domain.com' // Add your actual frontend domain here
        ];
        
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // This allows cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Server is running ✅' });
});

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        status: err.status || 500
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;