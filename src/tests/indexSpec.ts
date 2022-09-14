import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test main endpoint', () => {
  it('gets the root endpoint', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
  });
  it('gets the not found endpoint', async () => {
    const response = await request.get('/anything');
    expect(response.statusCode).toBe(404);
  });
});
