const handleError = (res, status, statusCode, message) => {
    res.json({
        status,
        statusCode,
        message,
    })
}

module.exports = handleError;