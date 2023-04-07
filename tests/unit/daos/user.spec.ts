import { Knex } from 'knex';
import UserDao from '../../../src/daos/user';

describe('Dao: User', () => {
  describe('fetchUserByExternalId', () => {
    it('should return null if no user is found', async () => {
      const mockKnex = _mockDatabase(null);
      const userDao = new UserDao(mockKnex);
      const user = await userDao.fetchUserByExternalId('123');
      expect(user).toBeNull();
    });
    it('should return a user if one is found', async () => {
      const mockKnex = _mockDatabase({
        id: 1,
        external_id: '123',
      });
      const userDao = new UserDao(mockKnex);
      const user = await userDao.fetchUserByExternalId('123');
      expect(user).not.toBeNull();
    });
    it('should return a user with the correct external id', async () => {
      const mockKnex = _mockDatabase({
        id: 1,
        external_id: '123',
      });
      const userDao = new UserDao(mockKnex);
      const user = await userDao.fetchUserByExternalId('123');
      expect(user?.external_id).toEqual('123');
    });
  });
});

function _mockDatabase(returnValue: any): Knex {
  return jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValue(returnValue),
  }) as unknown as Knex;
}