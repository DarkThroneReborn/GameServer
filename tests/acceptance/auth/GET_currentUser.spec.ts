import request from 'supertest';
import * as jsonwebtoken from 'jsonwebtoken';

import app from '../../../src/app';
import { Config } from '../../../config/environment';
import DaoFactory from '../../../src/daoFactory';
import errors, { appErrorToResponseError } from '../../../src/errors';
import { UserRow } from '../../../src/daos/user';

describe('GET Current User', () => {
  it('should respond with a 401 if the user is not authenticated', async () => {
    const mockConfig = {} as Config;
    const mockDaoFactory = {} as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application).get('/auth/currentUser');

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      errors: [appErrorToResponseError(errors.A1002)],
    });
  });
  it('should respond with the current user if the request is authenticated', async () => {
    const mockConfig = {
      jwtSecret: 'This is a secret',
    } as Config;

    const testJWT = jsonwebtoken.sign(
      { id: '01H1Q5JR757MDVTRGKH8DMD4G9' },
      mockConfig.jwtSecret
    );

    const mockUser = {
      id: '01H1Q5JR757MDVTRGKH8DMD4G9',
      email: 'test@example.com',
      units: '[]',
    } as unknown as UserRow;

    const mockDaoFactory = {
      user: {
        fetchUserByExternalId: jest.fn().mockResolvedValue(mockUser),
      },
    } as unknown as DaoFactory;
    const application = app(mockConfig, mockDaoFactory);

    const response = await request(application)
      .get('/auth/currentUser')
      .set('Authorization', `Bearer ${testJWT}`);

    expect(mockDaoFactory.user.fetchUserByExternalId).toHaveBeenCalledWith(
      '01H1Q5JR757MDVTRGKH8DMD4G9'
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: mockUser.id,
    });
  });
});
