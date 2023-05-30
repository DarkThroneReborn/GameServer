import cors from 'cors';
import { Request } from 'express';

export default function corsMiddleware(allowedOrigins: string[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const corsOptionsDelegate = function (req: Request, callback: any) {
    const originInList =
      allowedOrigins.indexOf(req.header('Origin') || '') !== -1;
    const corsOptions = { origin: originInList };
    callback(null, corsOptions);
  };

  return cors(corsOptionsDelegate);
}
