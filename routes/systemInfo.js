let os = require("os");
let util = require('../util/util');

module.exports = {
    general: (req, res, next) => {
        let data = {
            arch: os.arch(),
            platform: os.platform(),
            kernel: os.platform() + '  ' + os.release(),
            hostname: os.hostname(),
            homedir: os.homedir(),
            cpu: os.cpus(),
            mem: util.bytesToSize(os.totalmem()),
            uptime: parseInt(os.uptime()),
            network: os.networkInterfaces()
        };
        res.render('system-info/index', data);
    },
    network: (req, res, next) => {
        res.json({});
    },
    service: (req, res, next) => {
        res.json({});
    },
    system: (req, res, next) => {
        res.json({});
    },
    hardware: (req, res, next) => {
        res.json({});
    }
};
