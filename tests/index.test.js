
const request = require('supertest');
const app = require('../src/index');

describe('Server Initialization', () => {
  it('should start the server and respond with 200', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Server is running');
  });

  it('should respond with 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');

    expect(response.status).toBe(404);
  });
});
