import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import nutritionRoutes from './routes/nutritionRoutes';
import exerciseRoutes from './routes/exerciseRoutes';
import sleepRoutes from './routes/sleepRoutes';
import moodRoutes from './routes/moodRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Reitit
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/mood', moodRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});