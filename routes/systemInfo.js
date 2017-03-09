let os = require("os");
let util = require('../util/util');
let sse = require('../middleware/sse');

module.exports = {
    general: (req, res, next) => {
        res.render('system-info/index', {});
    },
    getGeneral: (req, res, next) => {
        res.sseSetup();
        let result = {};
        let timer = setInterval(() => {
            try {
                let freetime = exec('cat /proc/uptime').stdout.split(' ');
                result = {
                    code: 1,
                    data: {
                        nowtime: +new Date(),
                        uptime: parseInt(os.uptime()),
                        freetime: parseInt(freetime[1])
                    }
                };

            } catch (e) {
                result = {code: -1, message: 'err'}
            }
            res.sseSend(result);
        }, 1000);

        req.sseClose(req.connection,function () {
            clearInterval(timer);
        });
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
