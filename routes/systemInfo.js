let os = require("os");
let util = require('../util/util');

module.exports = {
    general: (req, res, next) => {
        res.render('system-info/index', {});
    },
    getGeneral: (req, res, next) => {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
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
            res.write("data: " + JSON.stringify(result) + "\n\n");
        }, 1000);

        req.connection.on("close", () => {
            res.end();
            clearInterval(timer);
            console.log("Client closed connection. Aborting.");
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
