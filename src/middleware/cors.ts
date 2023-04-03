import cors from 'cors';

export default function corsMiddleware(allowedOrigins: string[]) {
  const corsOptionsDelegate = function (req: any, callback: any) {
    const originInList = allowedOrigins.indexOf(req.header('Origin')) !== -1;
    const corsOptions = { origin: originInList }
    callback(null, corsOptions)
  }

  return cors(corsOptionsDelegate);
}