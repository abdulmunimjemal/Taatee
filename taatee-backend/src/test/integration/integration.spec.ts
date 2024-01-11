import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../path-to-your-app.module'; // Adjust the path accordingly

describe('User Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import your main module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /user/all should return all users for an admin', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/all')
      .set('Authorization', 'Bearer YOUR_ADMIN_TOKEN') // Add a valid admin token
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('GET /user should return the current user', async () => {
    const response = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', 'Bearer YOUR_USER_TOKEN') // Add a valid user token
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('PATCH /user should update the user profile', async () => {
    const updateUserDto = {
      // Your update data
    };

    const response = await request(app.getHttpServer())
      .patch('/user')
      .set('Authorization', 'Bearer YOUR_USER_TOKEN') // Add a valid user token
      .send(updateUserDto)
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('DELETE /user/:id should delete a user for an admin', async () => {
    const userIdToDelete = 1; // Replace with an existing user id
    const response = await request(app.getHttpServer())
      .delete(`/user/${userIdToDelete}`)
      .set('Authorization', 'Bearer YOUR_ADMIN_TOKEN') // Add a valid admin token
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });
});

// Booking
describe('Booking Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import your main module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /bookings should return all bookings for an admin', async () => {
    const response = await request(app.getHttpServer())
      .get('/bookings')
      .set('Authorization', 'Bearer YOUR_ADMIN_TOKEN') // Add a valid admin token
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('POST /bookings should create a new booking', async () => {
    const bookingData = {
      // Your booking data
    };

    const response = await request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', 'Bearer YOUR_USER_TOKEN') // Add a valid user token
      .send(bookingData)
      .expect(201);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('GET /bookings/:id should return a specific booking', async () => {
    const bookingId = 1; // Replace with an existing booking id
    const response = await request(app.getHttpServer())
      .get(`/bookings/${bookingId}`)
      .set('Authorization', 'Bearer YOUR_USER_TOKEN') // Add a valid user token
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('DELETE /bookings/:id should delete a booking for an admin', async () => {
    const bookingIdToDelete = 1; // Replace with an existing booking id
    const response = await request(app.getHttpServer())
      .delete(`/bookings/${bookingIdToDelete}`)
      .set('Authorization', 'Bearer YOUR_ADMIN_TOKEN') // Add a valid admin token
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });
});

// Events
describe('Event Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import your main module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /events/:id should return a specific event by ID', async () => {
    const eventId = 1; // Replace with an existing event id
    const response = await request(app.getHttpServer())
      .get(`/events/${eventId}`)
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('POST /events should create a new event', async () => {
    const eventDto = {
      // Your event data
    };

    const response = await request(app.getHttpServer())
      .post('/events')
      .send(eventDto)
      .expect(201);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('PATCH /events/:id should update a specific event', async () => {
    const eventIdToUpdate = 1; // Replace with an existing event id
    const updatedEventDto = {
      // Your updated event data
    };

    const response = await request(app.getHttpServer())
      .patch(`/events/${eventIdToUpdate}`)
      .send(updatedEventDto)
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });

  it('DELETE /events/:id should delete a specific event', async () => {
    const eventIdToDelete = 1; // Replace with an existing event id
    const response = await request(app.getHttpServer())
      .delete(`/events/${eventIdToDelete}`)
      .expect(200);

    // Add assertions based on your expected response
    expect(response.body).toBeDefined();
  });
});
