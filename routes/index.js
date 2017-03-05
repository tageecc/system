let express = require('express');
let router = express.Router();
let systemInfo = require('./systemInfo');
let service = require('./service');
let database = require('./database');
let file = require('./file');
let setting = require('./setting');

// 系统信息
router.get('/admin', systemInfo.general);
router.get('/admin/system-info', systemInfo.general);
router.get('/admin/system-info/general', systemInfo.general);
router.post('/admin/system-info/general', systemInfo.generalData);
router.get('/admin/system-info/network', systemInfo.network);
router.get('/admin/system-info/service', systemInfo.service);
router.get('/admin/system-info/system', systemInfo.system);
router.get('/admin/system-info/hardware', systemInfo.hardware);

// 服务管理
router.get('/admin/service/http', service.http);
router.get('/admin/service/ftp', service.ftp);
router.get('/admin/service/database', service.database);
router.get('/admin/service/application', service.application);
router.get('/admin/service/mail', service.mail);
router.get('/admin/service/system', service.system);

// 数据库
router.get('/admin/database/mysql', database.mysql);
router.get('/admin/database/mongodb', database.mongodb);

// 文件管理
router.get('/admin/file', file.list);
router.get('/admin/file/upload', file.upload);
router.get('/admin/file/delete', file.delete);
router.get('/admin/file/editor', file.editor);


router.get('/admin/file/editor', file.editor);


module.exports = router;
