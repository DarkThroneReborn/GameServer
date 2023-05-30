import request from 'supertest';

import { Config } from '../../../config/environment';
import app from '../../../src/app';
import DaoFactory from '../../../src/daoFactory';
import errors, { appErrorToResponseError } from '../../../src/errors';

describe('POST /createAccount', () => {
  it('should return a 400 if email or password is missing', async () => {
    const mockConfig = {} as Config;
    const mockDaoFactory = {} as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application)
      .post('/auth/createAccount')
      .send({});

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      errors: [
        appErrorToResponseError(errors.A1006),
        appErrorToResponseError(errors.A1000),
        appErrorToResponseError(errors.A1001),
      ],
    });
  });
  it('should return a 409 if the email already exists', async () => {
    const mockConfig = {} as Config;
    const mockDaoFactory = {
      user: {
        fetchUserByEmail: jest.fn().mockResolvedValue({
          external_id: '01H1Q5JR757MDVTRGKH8DMD4G9',
          email: 'test@example.com',
          password_hash: '',
        }),
      },
    } as unknown as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application)
      .post('/auth/createAccount')
      .send({
        username: 'testUser',
        email: 'test@example.com',
        password: 'password',
      });

    expect(response.status).toEqual(409);
    expect(response.body).toEqual({
      errors: [appErrorToResponseError(errors.A1005)],
    });
  });
  it('should return a 409 if the username already exists', async () => {
    const mockConfig = {} as Config;
    const mockDaoFactory = {
      user: {
        fetchUserByEmail: jest.fn().mockResolvedValue(null),
        fetchUserByUsername: jest.fn().mockResolvedValue({
          external_id: '01H1Q5JR757MDVTRGKH8DMD4G9',
          email: 'test@example.com',
          password_hash: '',
        }),
      },
    } as unknown as DaoFactory;

    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application)
      .post('/auth/createAccount')
      .send({
        username: 'testUser',
        email: 'test@example.com',
        password: 'password',
      });

    expect(response.status).toEqual(409);
    expect(response.body).toEqual({
      errors: [appErrorToResponseError(errors.A1007)],
    });
  });

  it('should return a 201 if the account was created', async () => {
    const mockConfig = {
      jwtSecret: 'This is a secret',
    } as Config;
    const mockDaoFactory = {
      user: {
        fetchUserByEmail: jest.fn().mockResolvedValue(null),
        fetchUserByUsername: jest.fn().mockResolvedValue(null),
        createUser: jest.fn().mockResolvedValue({
          external_id: '01H1Q5JR757MDVTRGKH8DMD4G9',
          email: 'test@example.com',
          password_hash: '',
        }),
      },
    } as unknown as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application)
      .post('/auth/createAccount')
      .send({
        username: 'testUser',
        email: 'test@example.com',
        password: 'password',
      });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      id: '01H1Q5JR757MDVTRGKH8DMD4G9',
      token: expect.any(String),
    });
  });
});
