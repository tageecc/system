let express = require('express');
let router = express.Router();
let _ = require('lodash');
let ps = require('current-processes');

router.get('/', function (req, res, next) {
    res.redirect('/admin/sysinfo');
});

router.get('/info', function (req, res, next) {
    ps.get(function (err, processes) {

        let sorted = _.sortBy(processes, 'cpu');
        let top = sorted.reverse().splice(0, 5);

        res.json(top);
    });

});


module.exports = router;
