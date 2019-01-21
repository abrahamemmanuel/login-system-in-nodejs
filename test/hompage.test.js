import request from 'supertest';
import app from '../server';

describe('homepage', () => {
  it('Welcomes the user', (done) => {
    request(app).get('/')
      .expect(200)
      .expect(/Welcome To Nodejs Login System/, done);
  });
});
