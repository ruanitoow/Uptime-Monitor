function errorHandler(err, req, res, next) {
    if (err.statusCode !== undefined) {
        res.status(err.statusCode)
        res.json({status: err.statusCode, erro: err.message });
    } else {
        res.status(500).json({status: 500, erro: err.message });
    }
}
export default errorHandler;