import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import errorHandler from './middleware/error-handler.js';

const app = express();
const PORT = 4000;

app.use(cors());         
app.use(express.json());    


app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Task Manager API listening on http://localhost:${PORT}`);
});
