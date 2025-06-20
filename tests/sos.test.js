import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import app from '../server.js';
jest.mock('../utils/sendSms.js'); // ✅ USE MOCK

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  await request(app)
    .post('/api/auth/register')
    .send({ name: 'Test SOS', email: 'sos@test.com', password: '123456' });

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'sos@test.com', password: '123456' });

  token = res.body.token;

  await request(app)
    .post('/api/contacts')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Mock Friend', phone: '+911234567891', relation: 'Brother' });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('SOS API', () => {
  test('Trigger SOS alert with mocked Twilio', async () => {
    const res = await request(app)
      .post('/api/sos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.details[0]).toMatch(/✅/);
  });
});
