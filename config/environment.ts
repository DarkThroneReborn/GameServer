import pkg from '../package.json';

export interface Config {
  serverPort: string;
  environment: 'development' | 'staging' | 'production';
  allowedOrigins: string[];
  version: string;
  jwtSecret: string;
}

const config: Config = {
  serverPort: process.env.GAME_SERVER_PORT || '3000',
  environment: 'development',
  allowedOrigins: [],
  version: pkg.version,
  jwtSecret: process.env.GAME_SERVER_JWT_SECRET || '01H1Q4QCEBX55VZMXNE1HE9AY4',
};

if (process.env.NODE_ENV === 'development') {
  config.allowedOrigins = [
    'http://localhost:3000', // Locally running web-client
  ];
}

if (process.env.NODE_ENV === 'staging') {
  config.environment = 'staging';
}

if (process.env.NODE_ENV === 'production') {
  config.environment = 'production';
}

export default config;
