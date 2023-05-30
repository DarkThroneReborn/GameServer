/**
 * This file contains all the errors that can be thrown by the application. It
 * may seem a bit overkill to have a separate file for this, but it's a good
 * practice to have a single source of truth for all the errors that can be
 * thrown by the application.
 *
 * This approach makes it much easier to maintain the errors, and it also makes
 * it easier to test the error handling logic. Additionally, the application
 * logic is much cleaner because it doesn't have to worry about the details of
 * the error handling.
 */

export type AppError = {
  code: string;
  httpStatus: number;
  title: string;
  detail: string;
};

const errors: { [k: string]: AppError } = {
  A1000: {
    code: 'A1000',
    httpStatus: 400,
    title: 'Missing Attribute',
    detail: 'email is a required attribute',
  },
  A1001: {
    code: 'A1001',
    httpStatus: 400,
    title: 'Missing Attribute',
    detail: 'password is a required attribute',
  },
  A1002: {
    code: 'A1002',
    httpStatus: 401,
    title: 'Unauthorized',
    detail: 'Your request is not authorized to access this resource.',
  },
  // The email address is not found in the database.
  A1003: {
    code: 'A1003',
    httpStatus: 401,
    title: 'Email or Password Incorrect',
    detail: 'The email or password you entered is incorrect.',
  },
  // The password does not match the password hash in the database.
  A1004: {
    code: 'A1004',
    httpStatus: 401,
    title: 'Email or Password Incorrect',
    detail: 'The email or password you entered is incorrect.',
  },
};

export default errors;

export function prepareErrorResponse(errors: AppError[]) {
  const httpStatus = errors.reduce((acc, error) => {
    if (error.httpStatus > acc) {
      return error.httpStatus;
    }
    return acc;
  }, 0);
  return {
    httpStatus,
    body: {
      errors: errors.map((error) => appErrorToResponseError(error)),
    },
  };
}

export function appErrorToResponseError(error: AppError) {
  return {
    code: error.code,
    title: error.title,
    detail: error.detail,
  };
}
