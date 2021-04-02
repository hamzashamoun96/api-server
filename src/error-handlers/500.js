'use strict';
module.exports = (err, req, res, next) => {
    res.status(500);
    res.statusMessage = 'SERVER ERROR';
    res.json({
        error: err.message,
        message: "500",
        route: req.path
    })
}

