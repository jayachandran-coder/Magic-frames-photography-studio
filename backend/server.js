require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Magic Frames API' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
  origin: 'https://magic-frames-photography-studio.vercel.app' // ← your vercel URL
}));
