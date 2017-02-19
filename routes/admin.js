let express = require('express');
let router = express.Router();
let _ = require('lodash');
let os = require("os");
var osUtils = require("os-utils");
let ps = require('current-processes');

router.get('/', function (req, res, next) {
    res.redirect('/admin/process');
});
router.get('/process', function (req, res, next) {
    res.render('admin/admin-process',{cur:'process'});
});
router.get('/performance', function (req, res, next) {
    res.render('admin/admin-performance',{cur:'performance'});
});
router.post('/process', function (req, res, next) {
    ps.get(function (err, processes) {
        let top = _.orderBy(processes, req.body.sort_type, req.body.sort_order == 1 ? 'asc' : 'desc');
        res.json(top);
    });
});
router.post('/performance', function (req, res, next) {
    osUtils.cpuUsage(function (value) {
        res.json(value);
    });
});

module.exports = router;
