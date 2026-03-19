require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'gfg-rit-backend',
    time: new Date().toISOString(),
  });
});

// Placeholder routers – will be implemented in later todos
app.use('/api/auth', (req, res) => res.status(501).json({ message: 'Auth routes not implemented yet.' }));
app.use('/api/events', (req, res) => res.status(501).json({ message: 'Events routes not implemented yet.' }));
app.use('/api/resources', (req, res) => res.status(501).json({ message: 'Resources routes not implemented yet.' }));
app.use('/api/community', (req, res) => res.status(501).json({ message: 'Community routes not implemented yet.' }));
app.use('/api/notifications', (req, res) =>
  res.status(501).json({ message: 'Notifications routes not implemented yet.' })
);
app.use('/api/contact', (req, res) => res.status(501).json({ message: 'Contact routes not implemented yet.' }));

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on http://localhost:${PORT}`);
});

