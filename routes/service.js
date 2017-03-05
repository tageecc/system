let os = require("os");
let util = require('../util/util');

module.exports = {
    http: (req, res, next) => {
        res.json({});
    },
    ftp: (req, res, next) => {
        res.json({});
    },
    database: (req, res, next) => {
        res.json({});
    },
    application: (req, res, next) => {
        res.json({});
    },
    mail: (req, res, next) => {
        res.json({});
    },
    system: (req, res, next) => {
        res.json({});
    }
};
