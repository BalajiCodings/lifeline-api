import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import app from '../server.js'; // make sure app is exported from server.js

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  test('Should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('Should not register with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'No Email',
        email: 'wrong-email',
        password: '123456'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('Valid email is required');
  });
});
