import request from 'supertest';

import { Config } from '../../../config/environment';
import app from '../../../src/app';
import DaoFactory from '../../../src/daoFactory';
import errors, { appErrorToResponseError } from '../../../src/errors';

describe('POST /login', () => {
  it('should return a 400 if email or password is missing', async () => {
    const mockConfig = {} as Config;
    const mockDaoFactory = {} as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application).post('/auth/login').send({});

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      errors: [
        appErrorToResponseError(errors.A1000),
        appErrorToResponseError(errors.A1001),
      ],
    });
  });
  it('should return a 401 if the email does not match a user record', async () => {
    const mockConfig = {} as Config;
    const mockDaoFactory = {
      user: {
        fetchUserByEmail: jest.fn().mockResolvedValue(null),
      },
    } as unknown as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(mockDaoFactory.user.fetchUserByEmail).toHaveBeenCalledWith(
      'test@example.com'
    );

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      errors: [appErrorToResponseError(errors.A1003)],
    });
  });
  it('should return a 401 if the password does not match the user record', async () => {
    const mockConfig = {} as Config;
    const mockDaoFactory = {
      user: {
        fetchUserByEmail: jest.fn().mockResolvedValue({
          id: '01H1Q5JR757MDVTRGKH8DMD4G9',
          email: 'test@example.com',
          password_hash: '',
        }),
      },
    } as unknown as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      errors: [appErrorToResponseError(errors.A1004)],
    });
  });
  it('should return a 200 if the email and password match a user record', async () => {
    const mockConfig = {
      jwtSecret: 'This is a secret',
    } as Config;
    const mockDaoFactory = {
      user: {
        fetchUserByEmail: jest.fn().mockResolvedValue({
          id: '01H1Q5JR757MDVTRGKH8DMD4G9',
          email: 'test@example.com',
          password_hash:
            '$2b$10$zMik0g/eyEz3Vjsk/jbfZeQFX6aO0RykQo3rcnJhwFTZY0Ze0IPMy',
        }),
      },
    } as unknown as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
