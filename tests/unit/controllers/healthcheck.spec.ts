import request from 'supertest';
import app from '../../../src/app';
import { Config } from '../../../config/config';
import DaoFactory from '../../../src/daoFactory';

describe('Healthcheck controller', () => {
  describe('GET /healthcheck', () => {
    it('should include X-Request-Id header', async () => {
      const mockConfig = {
        allowedOrigins: [] as string[],
        version: 'TEST_VERSION'
      } as Config;
      const mockDaoFactory = {
        testConnection: jest.fn().mockResolvedValue(true)
      } as unknown as DaoFactory;
      const mockApp = app(mockConfig, mockDaoFactory);

      const response = await request(mockApp).get('/healthcheck');

      expect(response.header).toHaveProperty('x-request-id');
    });
    it('should include X-Powered-By header', async () => {
      const mockConfig = {
        allowedOrigins: [] as string[],
        version: 'TEST_VERSION'
      } as Config;
      const mockDaoFactory = {
        testConnection: jest.fn().mockResolvedValue(true)
      } as unknown as DaoFactory;
      const mockApp = app(mockConfig, mockDaoFactory);

      const response = await request(mockApp).get('/healthcheck');

      expect(response.header).toHaveProperty('x-powered-by');
      expect(response.header['x-powered-by']).toBe(`Dark Throne Reborn Game Server ${mockConfig.version}`);
    });
    it('should return 200 with status OK when all is good', async () => {
      const mockConfig = {
        allowedOrigins: [] as string[],
        version: 'TEST_VERSION'
      } as Config;
      const mockDaoFactory = {
        testConnection: jest.fn().mockResolvedValue(true)
      } as unknown as DaoFactory;
      const mockApp = app(mockConfig, mockDaoFactory);

      const response = await request(mockApp).get('/healthcheck');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'OK',
        version: 'TEST_VERSION',
        checks: {
          database: 'OK'
        }
      });
    });
    it('should return 200 with status ERROR when database is not connected', async () => {
      const mockConfig = {
        allowedOrigins: [] as string[],
        version: 'TEST_VERSION'
      } as Config;
      const mockDaoFactory = {
        testConnection: jest.fn().mockResolvedValue(false)
      } as unknown as DaoFactory;
      const mockApp = app(mockConfig, mockDaoFactory);

      const response = await request(mockApp).get('/healthcheck');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'ERROR',
        version: 'TEST_VERSION',
        checks: {
          database: 'ERROR'
        }
      });
    });
  });
});