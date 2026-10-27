class HttpStatus {
    static OK = 200;
    static CREATED = 201;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static INTERNAL_SERVER_ERROR = 500;
}

class ResponseStatus {
    static SUCCESS = 'success';
    static FAIL = 'fail';
    static ERROR = 'error';
}

const FIELD_ORDER = [
    'message',
    'results',
    'total',
    'page',
    'totalPages',
    'token',
    'resetToken',
    'data',
    'errors',
    'dbConnected',
    'stack',
    'error',
];

class ApiResponse {
    constructor(statusCode, status, fields = {}) {
        this.statusCode = statusCode;
        this.status = status;
        this.fields = fields;
    }

    toJSON() {
        const body = { status: this.status };
        const used = new Set();

        for (const key of FIELD_ORDER) {
            if (Object.prototype.hasOwnProperty.call(this.fields, key) && this.fields[key] !== undefined) {
                body[key] = this.fields[key];
                used.add(key);
            }
        }

        for (const [key, value] of Object.entries(this.fields)) {
            if (used.has(key) || value === undefined || key === 'status' || key === 'statusCode') continue;
            body[key] = value;
        }

        return body;
    }

    send(res) {
        return res.status(this.statusCode).json(this.toJSON());
    }
}

class SuccessResponse extends ApiResponse {
    constructor(statusCode = HttpStatus.OK, fields = {}) {
        super(statusCode, ResponseStatus.SUCCESS, fields);
    }

    static ok(res, fields = {}) {
        return new SuccessResponse(HttpStatus.OK, fields).send(res);
    }

    static created(res, fields = {}) {
        return new SuccessResponse(HttpStatus.CREATED, fields).send(res);
    }
}

class FailResponse extends ApiResponse {
    constructor(statusCode = HttpStatus.BAD_REQUEST, fields = {}) {
        const { status, ...rest } = fields;
        const resolvedStatus = status || (String(statusCode).startsWith('4') ? ResponseStatus.FAIL : ResponseStatus.ERROR);
        super(statusCode, resolvedStatus, rest);
    }

    static badRequest(res, fields = {}) {
        return new FailResponse(HttpStatus.BAD_REQUEST, fields).send(res);
    }

    static send(res, statusCode, fields = {}) {
        return new FailResponse(statusCode, fields).send(res);
    }
}

module.exports = {
    HttpStatus,
    ResponseStatus,
    SuccessResponse,
    FailResponse,
};
