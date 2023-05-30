import { Request, Response } from 'express';
import errors, { AppError, prepareErrorResponse } from '../errors';

export default {
  async login(req: Request, res: Response) {
    const fieldValidationErrors: AppError[] = [
      { attr: 'email', error: errors.A1000 },
      { attr: 'password', error: errors.A1001 },
    ]
      .map((check) => {
        if (!req.body[check.attr]) {
          return check.error;
        }
        return null;
      })
      .filter((error) => error !== null) as AppError[];

    if (fieldValidationErrors.length > 0) {
      const errorResponse = prepareErrorResponse(fieldValidationErrors);
      res.status(errorResponse.httpStatus).json(errorResponse.body);
      return;
    }

    const { email, password } = req.body;

    const user = await req.ctx.modelFactory.user.fetchUserByEmail(
      req.ctx,
      email
    );
    if (!user) {
      const errorResponse = prepareErrorResponse([errors.A1003]);
      res.status(errorResponse.httpStatus).json(errorResponse.body);
      return;
    }

    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches) {
      const errorResponse = prepareErrorResponse([errors.A1004]);
      res.status(errorResponse.httpStatus).json(errorResponse.body);
      return;
    }

    const token = await user.generateAuthToken();

    res.status(200).json({
      token: token,
    });
  },

  async createAccount(req: Request, res: Response) {
    const fieldValidationErrors: AppError[] = [
      { attr: 'username', error: errors.A1006 },
      { attr: 'email', error: errors.A1000 },
      { attr: 'password', error: errors.A1001 },
    ]
      .map((check) => {
        if (!req.body[check.attr]) {
          return check.error;
        }
        return null;
      })
      .filter((error) => error !== null) as AppError[];

    if (fieldValidationErrors.length > 0) {
      const errorResponse = prepareErrorResponse(fieldValidationErrors);
      res.status(errorResponse.httpStatus).json(errorResponse.body);
      return;
    }

    const { username, email, password } = req.body;

    const userByEmail = await req.ctx.modelFactory.user.fetchUserByEmail(
      req.ctx,
      email
    );
    if (userByEmail) {
      const errorResponse = prepareErrorResponse([errors.A1005]);
      res.status(errorResponse.httpStatus).json(errorResponse.body);
      return;
    }

    const userByUsername = await req.ctx.modelFactory.user.fetchUserByUsername(
      req.ctx,
      username
    );
    if (userByUsername) {
      const errorResponse = prepareErrorResponse([errors.A1007]);
      res.status(errorResponse.httpStatus).json(errorResponse.body);
      return;
    }

    const newUser = await req.ctx.modelFactory.user.createUser(
      req.ctx,
      username,
      email,
      password
    );

    const token = await newUser.generateAuthToken();

    res.status(201).json({
      id: newUser.externalId,
      token: token,
    });
  },

  async getCurrentUser(req: Request, res: Response) {
    // This is a protected route, so we can assume that the user is authenticated.
    if (!req.ctx.user) return;

    res.status(200).json({
      id: req.ctx.user.id,
    });
  },
};
