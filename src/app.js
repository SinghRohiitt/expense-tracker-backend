import express from 'express';
import userRoutes from './routes/user.routes.js';
import expenseRoutes from './routes/expense.routes.js';

const app = express();

app.use(express.json());

app.use('/', userRoutes);
app.use('/', expenseRoutes);

export default app;
