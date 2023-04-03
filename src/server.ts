import config from '../config/config';
import App from './app';

const app = App(config);

app.listen(config.serverPort, () => {
  console.log('Server started');
});