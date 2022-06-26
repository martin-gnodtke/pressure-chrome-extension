class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends HttpError { } // 400

export class UnauthorizedError extends HttpError { } // 401

export class ForbiddenError extends HttpError { } // 403

export class NotFoundError extends HttpError { } // 404

export class ConflictError extends HttpError { } // 409

export class TooManyRequestsError extends HttpError { } // 429