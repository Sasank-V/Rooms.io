// src/index.ts
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import roomRoutes from './routes/rooms';
import guestRoutes from './routes/guests';
import paymentRoutes from './routes/payments';
import orderRoutes from './routes/orders';
import alertRoutes from './routes/alerts';
import auditRoutes from './routes/audit';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/rooms', roomRoutes);
app.use('/guests', guestRoutes);
app.use('/payments', paymentRoutes);
app.use('/orders', orderRoutes);
app.use('/alerts', alertRoutes);
app.use('/audit', auditRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
