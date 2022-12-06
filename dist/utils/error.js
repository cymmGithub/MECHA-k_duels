export class ValidationError extends Error {
}
export function handleError(error, req, res, next) {
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
    res.json('Sorry try again later');
}
//# sourceMappingURL=error.js.map