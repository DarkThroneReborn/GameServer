import request from 'supertest';
import app from '../../../src/app';
import { Config } from '../../../config/config';

describe('Healthcheck controller', () => {
  describe('GET /healthcheck', () => {
    it('should include X-Request-Id header', async () => {
      const mockConfig = {
        allowedOrigins: [] as string[],
        version: 'TEST_VERSION'
      } as Config;
      const mockApp = app(mockConfig);

      const response = await request(mockApp).get('/healthcheck');

      expect(response.header).toHaveProperty('x-request-id');
    });
    it('should include X-Powered-By header', async () => {
      const mockConfig = {
        allowedOrigins: [] as string[],
        version: 'TEST_VERSION'
      } as Config;
      const mockApp = app(mockConfig);

      const response = await request(mockApp).get('/healthcheck');

      expect(response.header).toHaveProperty('x-powered-by');
      expect(response.header['x-powered-by']).toBe(`Dark Throne Reborn Game Server ${mockConfig.version}`);
    });
    it('should return 200', async () => {
      const mockConfig = {
        allowedOrigins: [] as string[],
        version: 'TEST_VERSION'
      } as Config;
      const mockApp = app(mockConfig);

      const response = await request(mockApp).get('/healthcheck');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'OK',
        version: 'TEST_VERSION'
      });
    });
  });
});