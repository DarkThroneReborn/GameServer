import corsMiddleware from '../../../src/middleware/cors';

describe('CORS middleware', () => {
  describe('generateCorsConfig', () => {
    it('should return a function', () => {
      const config = corsMiddleware([]);
      expect(config).toBeInstanceOf(Function);
    });
  });
});