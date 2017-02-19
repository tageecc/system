let express = require('express');
let router = express.Router();
let _ = require('lodash');
let ps = require('current-processes');

router.get('/', function (req, res, next) {
    res.redirect('/admin/process');
});
router.get('/process', function (req, res, next) {
    res.render('admin/admin-process');
});

router.post('/process', function (req, res, next) {
    ps.get(function (err, processes) {
        let top = _.orderBy(processes, req.body.sort_type, req.body.sort_order == 1 ? 'asc' : 'desc');
        res.json(top);
    });

});


module.exports = router;
