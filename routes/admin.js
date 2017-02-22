let express = require('express');
let router = express.Router();
let _ = require('lodash');
let os = require("os");
let osUtils = require("os-utils");
let ps = require('current-processes');
require('shelljs/global');

router.get('/', function (req, res, next) {
    res.redirect('/admin/sysinfo');
});
router.get('/process', function (req, res, next) {
    res.render('admin/admin-process', {cur: 'process'});
});
router.post('/process', function (req, res, next) {
    ps.get(function (err, processes) {
        let top = _.orderBy(processes, req.body.sort_type, req.body.sort_order == 1 ? 'asc' : 'desc');
        res.json(top);
    });
});

router.get('/performance', function (req, res, next) {
    res.render('admin/admin-performance', {cur: 'performance'});
});
router.post('/performance', function (req, res, next) {
    osUtils.cpuUsage(function (value) {
        res.json({cpu: value, mem: 1 - osUtils.freememPercentage(), device: value, network: value});
    });
});

router.get('/sysinfo', function (req, res, next) {
    let data = {
        kernel: os.platform() + '  ' + os.release(),
        hostname: os.hostname(),
        cpu: os.cpus(),
        mem: os.totalmem,
        uptime: os.uptime(),
        network: os.networkInterfaces()
    };
    console.log(data);
    res.render('admin/admin-sysinfo', Object.assign({}, data, {cur: 'sysinfo'}));
});

router.get('/nginx', function (req, res, next) {
    let exist = exec('rpm -q nginx').stdout.length != 0;

    res.render('admin/admin-nginx', {exist: exist, cur: 'nginx'});
});

module.exports = router;
