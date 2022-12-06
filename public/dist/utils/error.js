"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ValidationError = void 0;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
function handleError(error, req, res, next) {
    if (error.code === 'ER_DUP_ENTRY') {
        res
            .status(400)
            .json('Pilot with such a name already exists');
        console.error(error);
    }
    if (error instanceof ValidationError) {
        res
            .status(400)
            .json(error.message);
        console.error(error);
    }
    res.status(500);
    res.json(error.message);
}
exports.handleError = handleError;
//# sourceMappingURL=error.js.map