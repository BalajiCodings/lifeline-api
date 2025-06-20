import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import app from '../server.js';

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // Register and login user
  await request(app)
    .post('/api/auth/register')
    .send({ name: 'Test User', email: 'contactuser@test.com', password: 'password123' });

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'contactuser@test.com', password: 'password123' });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Contacts API', () => {
  let contactId;

  test('Create a contact', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Emergency Friend',
        phone: '+911234567890',
        relation: 'Friend'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Emergency Friend');
    contactId = res.body._id;
  });

  test('Fetch all contacts', async () => {
    const res = await request(app)
      .get('/api/contacts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Delete contact', async () => {
    const res = await request(app)
      .delete(`/api/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
