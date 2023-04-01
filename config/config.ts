interface Config {
  serverPort: string;
}

const config: Config = {
  serverPort: process.env.GAME_SERVER_PORT || '3000',
};

export default config;