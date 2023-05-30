import { Context } from '../../src/app';

declare global {
  declare namespace Express {
    interface Request {
      ctx: Context;
    }
  }
}
