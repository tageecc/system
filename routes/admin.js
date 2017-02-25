let express = require('express');
let router = express.Router();
let fs = require("fs");
let _ = require('lodash');
let os = require("os");
let osUtils = require("os-utils");
let ps = require('current-processes');
let util = require('../util/util');
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
    res.render('admin/admin-sysinfo', Object.assign({}, data, {cur: 'sysinfo'}));
});

router.get('/nginx', function (req, res, next) {
    let data = {};
    let nginx = exec('nginx -V', {silent: true});
    console.log(nginx);
    data.exist = nginx.code == '0';
    if (data.exist) {
        data.version = nginx.stderr.match(/nginx\/[0-9]+\.[0-9]+\.[0-9]+/);
        data.conf = nginx.stderr.match(/--conf-path=(\S+)\s/)[1]
    }
    res.render('admin/admin-nginx', {data: data, cur: 'nginx'});
});
/**
 * 安装nginx
 */
router.get('/nginx/install', function (req, res, next) {
    let nginx = exec('yum install nginx -y', {silent: true});
    res.json({code: nginx.code});
});


router.get('/website', function (req, res, next) {
    let data = {};
    let nginx = exec('nginx -V', {silent: true});
    data.exist = nginx.code == '0';
    if (data.exist) {
        data.conf = nginx.stderr.match(/--conf-path=(\S+)\s/)[1];

        let config = fs.existsSync(data.conf) ? fs.readFileSync(data.conf, "utf-8") : '';
        config = config.split('\n').filter(item => {
            let line = item.replace(/(^\s*)/g, "");
            return line.length > 0 && line[0] != '#'
        }).join('');
        console.log(config);
    }
    // console.log(data);
    res.render('admin/admin-website', {data: data, cur: 'website'});
});

module.exports = router;
