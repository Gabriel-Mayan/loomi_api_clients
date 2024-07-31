import { ZodError as ZError } from 'zod';
import { Response } from "../interfaces/express.interface";
import { IInvalidParams } from '../interfaces/all.interface';

import {
    HTTP_CONFLICT,
    HTTP_NOT_FOUND,
    HTTP_BAD_REQUEST,
    HTTP_UNAUTHORIZED,
    HTTP_INTERNAL_SERVER_ERROR,
} from '../utils/error.util';

class BaseError extends Error {
    public type: string;
    public title: string;
    public status: number;
    public details: string;
    public extras: object;
    public method: string | undefined;
    public instance: string | undefined;

    constructor(status: number, {
        type = '',
        title = '',
        message = '',
        details = '',
        extras = {},
    }) {
        super();

        this.type = type;
        this.title = title;
        this.status = status;
        this.details = details;
        this.message = message;
        this.extras = extras;
    }

    sendError(response: Readonly<Response>) {
        this.instance = response.req.path;
        this.method = response.req.method;

        return response.status(this.status).contentType('application/problem+json').send({
            type: this.type,
            message: this.message,
            title: this.title,
            details: this.details,
            status: this.status,
            instance: this.instance,
            ...this.extras,
        });
    };
}

export class InternalError extends BaseError {
    constructor(
        message = 'Internal Error',
        { title = 'Internal Error', type = 'about:blank', details = '', extras = {} } = {}
    ) {
        super(HTTP_INTERNAL_SERVER_ERROR, {
            type,
            title,
            details,
            extras,
            message,
        });
    }
}

export class RequestFieldError extends BaseError {
    constructor(
        message = 'Request Fields Error',
        invalidParams: IInvalidParams = [],
        { title = 'Request Fields Error', type = 'about:blank', details = '', extras = {} } = {}
    ) {
        super(HTTP_BAD_REQUEST, {
            type,
            title,
            details,
            message,
            extras: { invalid_params: invalidParams, ...extras },
        });
    }
}

export class ConflitError extends BaseError {
    constructor(
        message = 'Conflict Error',
        { title = 'Conflict Error', type = 'about:blank', details = '', extras = {} } = {}
    ) {
        super(HTTP_CONFLICT, {
            type,
            title,
            details,
            message,
            extras,
        });
    }
}

export class AuthenticationError extends BaseError {
    constructor(
        message = 'Authentication Error',
        { title = 'Authentication Error', type = 'about:blank', details = '', extras = {} } = {}
    ) {
        super(HTTP_UNAUTHORIZED, {
            type,
            title,
            details,
            message,
            extras,
        });
    }
}

export class NotFoundError extends BaseError {
    constructor(
        message = 'Not Found Error',
        { title = 'Not Found Error', type = 'about:blank', details = '', extras = {} } = {}
    ) {
        super(HTTP_NOT_FOUND, {
            type,
            title,
            details,
            message,
            extras,
        });
    }
}

export class ValidationError extends BaseError {
    constructor(
        error: unknown,
        message = "Validation Error",
        { title = "Validation Error", type = 'about:blank', details = '', extras = {} } = {}
    ) {
        super(HTTP_BAD_REQUEST, {
            type,
            title,
            message,
            details,
            extras: { invalid_params: ValidationError.formatError(error as ZError), ...extras },
        });
    }

    private static formatError(error: Readonly<ZError>): { name: string; reason: string }[] {
        const { issues } = error;

        return issues.map((err) => {
            return { name: err.path[0] as string, reason: err.message };
        });
    }
}
