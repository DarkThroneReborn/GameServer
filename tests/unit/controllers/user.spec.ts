import { Request, Response } from 'express';
import { fetchUserByExternalId } from '../../../src/controllers/user';
import UserModel from '../../../src/models/user';

describe('Controller: User', () => {
  describe('GET /user/:userId', () => {
    it('should return a 404 if the user does not exist', async () => {
      const mockRequest = _mockRequest(null);
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      await fetchUserByExternalId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
    it('should return a 200 if the user exists', async () => {
      const mockRequest = _mockRequest(
        {
          externalId: 'abc123',
        } as UserModel
      );
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      await fetchUserByExternalId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: 'abc123',
      });
    });
  });
});

const _mockRequest = (user: UserModel | null): Request => {
  return {
    params: {
      externalId: 'abc123',
    },
    ctx: {
      modelFactory: {
        user: {
          fetchUserByExternalId: jest.fn().mockResolvedValue(user),
        },
      },
    },
  } as unknown as Request;
}
