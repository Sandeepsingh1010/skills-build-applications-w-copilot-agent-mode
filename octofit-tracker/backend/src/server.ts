import express from 'express';
import { connectDatabase } from './config/database.js';
import { activity } from './models/activity.js';
import { leaderboard } from './models/leaderboard.js';
import { team } from './models/team.js';
import { user } from './models/user.js';
import { workout } from './models/workout.js';
import { createResourceRouter } from './routes/resourceRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/users', createResourceRouter(user));
app.use('/api/teams', createResourceRouter(team));
app.use('/api/activities', createResourceRouter(activity));
app.use('/api/leaderboard', createResourceRouter(leaderboard));
app.use('/api/workouts', createResourceRouter(workout));

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

export { app, baseUrl };

if (process.env.NODE_ENV !== 'test') {
  connectDatabase()
    .then(() => {
      app.listen(port, '0.0.0.0', () => {
        console.log(`OctoFit backend listening at ${baseUrl}`);
      });
    })
    .catch((error: unknown) => {
      console.error('Unable to start OctoFit backend:', error);
      process.exitCode = 1;
    });
}