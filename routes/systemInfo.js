let os = require("os");
let util = require('../util/util');

module.exports = {
    general: (req, res, next) => {
        res.render('system-info/index',{});
    },
    generalData: (req, res, next) => {
        let result = {};
        try {
            let freetime = exec('cat /proc/uptime').stdout.split(' ');
            result = {
                code: 1,
                data:{
                    nowtime: +new Date(),
                    uptime: parseInt(os.uptime()),
                    freetime: parseInt(freetime[1])
                }
            };

        } catch (e) {
            result = {code: -1, message: 'err'}
        }

        console.log(result);

        res.json(result);
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
