import { Context } from '../../../src/app';
import { UserRow } from '../../../src/daos/user';
import UserModel from '../../../src/models/user';

// Mock user data
const mockUserData: UserRow = {
  id: 1,
  external_id: 'abc123',
  username: 'testuser',
  password_hash: 'passwordhash',
  email: 'testuser@example.com',
  created_at: new Date(),
  updated_at: new Date(),
  gold: 100,
  units: '[]',
  offensive_strength: 50,
  defensive_strength: 50,
  gold_per_turn: 10,
};

describe('Model: User', () => {
  describe('constructor', () => {
    it('should create a new user model', () => {
      const ctx = _mockContext(mockUserData);
      const user = new UserModel(ctx, mockUserData);
      expect(user).not.toBeNull();
    });
    it('should populate the user model with the correct data', () => {
      const ctx = _mockContext(mockUserData);
      const user = new UserModel(ctx, mockUserData);

      // This will fail if you add a new property to the UserModel class without updating this test
      expect(Object.keys(user).length).toEqual(13);

      expect(user.id).toEqual(mockUserData.id);
      expect(user.externalId).toEqual(mockUserData.external_id);
      expect(user.username).toEqual(mockUserData.username);
      expect(user.passwordHash).toEqual(mockUserData.password_hash);
      expect(user.email).toEqual(mockUserData.email);
      expect(user.createdAt).toEqual(mockUserData.created_at);
      expect(user.updatedAt).toEqual(mockUserData.updated_at);
      expect(user.gold).toEqual(mockUserData.gold);
      expect(user.units).toEqual(mockUserData.units);
      expect(user.offensiveStrength).toEqual(mockUserData.offensive_strength);
      expect(user.defensiveStrength).toEqual(mockUserData.defensive_strength);
      expect(user.goldPerTurn).toEqual(mockUserData.gold_per_turn);
    });
  });
  describe('fetchUserByExternalId', () => {
    it('should return null if no user is found', async () => {
      const ctx = _mockContext(null);
      const user = await UserModel.fetchUserByExternalId(ctx, 'abc123');
      expect(user).toBeNull();
    });
    it('should return a user if one is found', async () => {
      const ctx = _mockContext(mockUserData);
      const user = await UserModel.fetchUserByExternalId(ctx, 'abc123');
      expect(user).not.toBeNull();
    });
    it('should return a user with the correct external id', async () => {
      const ctx = _mockContext(mockUserData);
      const user = await UserModel.fetchUserByExternalId(ctx, 'abc123');
      expect(user?.externalId).toEqual('abc123');
    });
  });
});

const _mockContext = (user: UserRow | null): Context => {
  return {
    daoFactory: {
      user: {
        fetchUserByExternalId: jest.fn().mockResolvedValue(user),
      },
    },
  } as unknown as Context;
};
