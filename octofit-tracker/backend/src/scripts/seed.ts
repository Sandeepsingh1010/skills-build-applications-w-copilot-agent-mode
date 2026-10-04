import mongoose from 'mongoose';
import { activity } from '../models/activity.js';
import { leaderboard } from '../models/leaderboard.js';
import { team } from '../models/team.js';
import { user } from '../models/user.js';
import { workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      user.deleteMany({}),
      team.deleteMany({}),
      activity.deleteMany({}),
      leaderboard.deleteMany({}),
      workout.deleteMany({}),
    ]);

    const users = await user.insertMany([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Morgan' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Rivera' },
    ]);

    const teams = await team.insertMany([
      { name: 'OctoFit Crew', description: 'A friendly fitness challenge team', members: [users[0]._id, users[1]._id] },
    ]);

    await activity.insertMany([
      { userId: users[0]._id, type: 'Running', durationMinutes: 30, calories: 280 },
      { userId: users[1]._id, type: 'Cycling', durationMinutes: 45, calories: 410 },
    ]);

    await leaderboard.insertMany([
      { userId: users[0]._id, points: 280, rank: 1 },
      { userId: users[1]._id, points: 240, rank: 2 },
    ]);

    await workout.insertMany([
      {
        name: 'Quick Cardio',
        description: 'A short workout to raise your heart rate.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Jumping jacks', 'Bodyweight squats', 'High knees'],
      },
      {
        name: 'Strength Builder',
        description: 'A balanced strength session for the whole body.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Push-ups', 'Lunges', 'Plank'],
      },
    ]);

    console.log(`Seeded ${users.length} users and ${teams.length} team`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
