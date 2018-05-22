var auth = require('../utils/auth');
var express = require('express');
var router = express.Router();
var dashboard = require('../controller/dashboard/dashboard');
var organization = require('../controller/dashboard/organization');
var code = require('../controller/dashboard/code');
var customer = require('../controller/dashboard/customer');
var order = require('../controller/dashboard/order');
var material = require('../controller/dashboard/material');
var fabric = require('../controller/dashboard/fabric');
var cut = require('../controller/dashboard/cut');
var print = require('../controller/dashboard/print');
var wash = require('../controller/dashboard/wash');
var sew = require('../controller/dashboard/sew');
var iron = require('../controller/dashboard/iron');
var inspection = require('../controller/dashboard/inspection');

var common = require('../controller/dashboard/common');
// Main routes for app
router.get('/', auth.requireLogin, auth.requireRole(0), dashboard.index);
router.post('/chartdata', auth.requireLogin, dashboard.chartdata);
router.post('/metadata', auth.requireLogin, dashboard.metadata);
router.post('/avgdata', auth.requireLogin, dashboard.avgdata);

router.get('/organization/factory', auth.requireLogin, auth.requireRole(12), organization.factory);
router.post('/organization/factory_add', auth.requireLogin, auth.requireRole(12), organization.factory_add);
router.post('/organization/factory_update', auth.requireLogin, auth.requireRole(12), organization.factory_update);
router.post('/organization/factory_list', organization.factory_list);
router.post('/organization/factory_remove', auth.requireLogin, auth.requireRole(12), organization.factory_remove);

router.get('/organization/department', auth.requireLogin, auth.requireRole(12), organization.department);
router.post('/organization/department_add', auth.requireLogin, auth.requireRole(12), organization.department_add);
router.post('/organization/department_update', auth.requireLogin, auth.requireRole(12), organization.department_update);
router.post('/organization/department_list', organization.department_list);
router.post('/organization/department_remove', auth.requireLogin, auth.requireRole(12), organization.department_remove);

router.get('/organization/line',  auth.requireLogin, auth.requireRole(12), organization.line);
router.post('/organization/line_add', auth.requireLogin, auth.requireRole(12), organization.line_add);
router.post('/organization/line_update', auth.requireLogin, auth.requireRole(12), organization.line_update);
router.post('/organization/line_list', auth.requireLogin, auth.requireRole(12), organization.line_list);
router.post('/organization/line_remove', auth.requireLogin, auth.requireRole(12), organization.line_remove);

router.get('/organization/users', auth.requireLogin, auth.requireRole(12), organization.users);
router.post('/organization/checkemail', organization.checkemail);
router.post('/organization/user_add', auth.requireLogin, auth.requireRole(12), organization.user_add);
router.post('/organization/user_auth', auth.requireLogin, auth.requireRole(12), organization.user_auth);
router.post('/organization/user_update', auth.requireLogin, auth.requireRole(12), organization.user_update);
router.post('/organization/add_auth', auth.requireLogin, auth.requireRole(12), organization.add_auth);
router.post('/organization/update_auth', auth.requireLogin, auth.requireRole(12), organization.update_auth);
router.post('/organization/remove_auth', auth.requireLogin, auth.requireRole(12), organization.remove_auth);

router.get('/codes/yarn', auth.requireLogin, auth.requireRole(14), code.yarn);
router.post('/codes/yarn_add', auth.requireLogin, auth.requireRole(14), code.yarn_add);
router.post('/codes/yarn_update', auth.requireLogin, auth.requireRole(14), code.yarn_update);
router.post('/codes/yarn_remove', auth.requireLogin, auth.requireRole(14), code.yarn_remove);

router.get('/codes/fabric', auth.requireLogin, auth.requireRole(14), code.fabric);
router.post('/codes/fabric_add', auth.requireLogin, auth.requireRole(14), code.fabric_add);
router.post('/codes/fabric_update', auth.requireLogin, auth.requireRole(14), code.fabric_update);
router.post('/codes/fabric_remove', auth.requireLogin, auth.requireRole(14), code.fabric_remove);

router.get('/codes/submaterial', auth.requireLogin, auth.requireRole(14), code.submaterial);
router.post('/codes/submaterial_add', auth.requireLogin, auth.requireRole(14), code.submaterial_add);
router.post('/codes/submaterial_update', auth.requireLogin, auth.requireRole(14), code.submaterial_update);
router.post('/codes/submaterial_remove', auth.requireLogin, auth.requireRole(14), code.submaterial_remove);
router.post('/codes/submaterial_list', auth.requireLogin, auth.requireRole(14), code.submaterial_list);

router.get('/codes/others', auth.requireLogin, auth.requireRole(14), code.others);
router.post('/codes/others_add', auth.requireLogin, auth.requireRole(14), code.others_add);
router.post('/codes/others_update', auth.requireLogin, auth.requireRole(14), code.others_update);
router.post('/codes/others_list', auth.requireLogin, auth.requireRole(14), code.others_list);
router.post('/codes/other_remove', auth.requireLogin, auth.requireRole(14), code.other_remove);

router.get('/customer/new', auth.requireLogin, auth.requireRole(13), customer.new);
router.post('/customer/checkemail', auth.requireLogin, auth.requireRole(13), customer.check);
router.get('/customer/list', auth.requireLogin, auth.requireRole(13), customer.list);
router.post('/customer/add', auth.requireLogin, auth.requireRole(13), customer.add);
router.post('/customer/update', auth.requireLogin, auth.requireRole(13), customer.update);
router.post('/customer/edit', auth.requireLogin, auth.requireRole(13), customer.edit);
router.post('/customer/sizegroup_add', auth.requireLogin, auth.requireRole(13), customer.sizegroup_add);
router.post('/customer/sizegroup_update', auth.requireLogin, auth.requireRole(13), customer.sizegroup_update);
router.post('/customer/sizegroup_remove', auth.requireLogin, auth.requireRole(13), customer.sizegroup_remove);
router.post('/customer/sizegroup_list', auth.requireLogin, auth.requireRole(13), customer.sizegroup_list);
router.post('/customer/productmaterialgroup_add', auth.requireLogin, auth.requireRole(13), customer.productmaterialgroup_add);
router.post('/customer/productmaterialgroup_update', auth.requireLogin, auth.requireRole(13), customer.productmaterialgroup_update);
router.post('/customer/productmaterialgroup_remove', auth.requireLogin, auth.requireRole(13), customer.productmaterialgroup_remove);
router.post('/customer/productmaterialgroup_list', auth.requireLogin, auth.requireRole(13), customer.productmaterialgroup_list);
router.post('/customer/finishmaterialgroup_add', auth.requireLogin, auth.requireRole(13), customer.finishmaterialgroup_add);
router.post('/customer/finishmaterialgroup_update', auth.requireLogin, auth.requireRole(13), customer.finishmaterialgroup_update);
router.post('/customer/finishmaterialgroup_remove', auth.requireLogin, auth.requireRole(13), customer.finishmaterialgroup_remove);
router.post('/customer/finishmaterialgroup_list', auth.requireLogin, auth.requireRole(13), customer.finishmaterialgroup_list);
router.post('/customer/follower_add', auth.requireLogin, auth.requireRole(13), customer.follower_add);
router.post('/customer/follower_remove', auth.requireLogin, auth.requireRole(13), customer.follower_remove);

router.get('/order/list', auth.requireLogin, auth.requireRole(1), order.list);
router.get('/order/new', auth.requireLogin, auth.requireRole(1), order.new);
router.post('/order/group_list', auth.requireLogin, order.group_list);
router.post('/order/order_add', auth.requireLogin, order.order_add);
router.post('/order/order_remove', auth.requireLogin, order.order_remove);
router.post('/order/order_image_add', auth.requireLogin, order.order_image_add);
router.post('/order/order_detail', auth.requireLogin, auth.requireRole(1), order.order_detail);
router.post('/order/order_by_id', auth.requireLogin, order.order_detail_byid);
router.post('/order/image_delete', auth.requireLogin, order.image_delete);
router.post('/order/order_fabric_add', auth.requireLogin, order.order_fabric_add);
router.post('/order/order_fabric_update', auth.requireLogin, order.order_fabric_update);
router.post('/order/order_fabric_remove', auth.requireLogin, order.order_fabric_remove);
router.post('/order/order_fabric_get', auth.requireLogin, order.order_fabric_get);
router.post('/order/order_fabric_list', auth.requireLogin, order.order_fabric_list);
router.post('/order/order_detail_add', auth.requireLogin, order.order_detail_add);
router.post('/order/order_detail_get', auth.requireLogin, order.order_detail_get);
router.post('/order/order_detail_update', auth.requireLogin, order.order_detail_update);
router.post('/order/order_detail_all', auth.requireLogin, order.order_detail_all);
router.post('/order/order_detail_remove', auth.requireLogin, order.order_detail_remove);
router.post('/order/update_material_group', auth.requireLogin, order.update_material_group);
router.post('/order/order_update_2', auth.requireLogin, order.order_update_2);
router.post('/orderdetail/excel_upload', auth.requireLogin, order.excel_upload);
router.get('/order/report', auth.requireLogin, auth.requireRole(1), order.report);
router.post('/order/report/list', auth.requireLogin, order.report_list);
router.post('/order/order_detail_remove_all', auth.requireLogin, order.order_detail_remove_all);

//Material Sub Menu
router.get('/material/in', auth.requireLogin, auth.requireRole(17), material.in);
router.post('/material/search', auth.requireLogin, material.order_search);
router.post('/material/order_material', auth.requireLogin, material.order_material);
router.post('/material/material_task', auth.requireLogin, material.material_task);
router.post('/material/size_list', auth.requireLogin, material.size_list);
router.post('/material/material_in', auth.requireLogin, material.material_in);
router.post('/material/material_in_update', auth.requireLogin, material.material_in_update);
router.post('/material/material_in_list', auth.requireLogin, material.material_in_list);
router.post('/material/material_in_delete', auth.requireLogin, material.material_in_delete);
router.get('/material/out', auth.requireLogin, auth.requireRole(18), material.out);
router.post('/material/material_out', auth.requireLogin, material.material_out);
router.post('/material/material_out_update', auth.requireLogin, material.material_out_update);
router.post('/material/material_out_list', auth.requireLogin, material.material_out_list);
router.post('/material/material_out_delete', auth.requireLogin, material.material_out_delete);
router.get('/material/stock', auth.requireLogin, auth.requireRole(3), material.stock);
router.post('/material/stock/search', auth.requireLogin, material.stock_search);

//Fabric Sub Menu
router.get('/fabric/in', auth.requireLogin, auth.requireRole(15), fabric.in);
router.post('/fabric/search', auth.requireLogin, fabric.order_search);
router.post('/fabric/order_fabric', auth.requireLogin, fabric.order_fabric);
router.post('/fabric/orderdetail', auth.requireLogin, fabric.order_detail);
router.post('/fabric/fabric_in', auth.requireLogin, auth.requireRole(15), fabric.fabric_in);
router.post('/fabric/fabric_in_update', auth.requireLogin, auth.requireRole(15), fabric.fabric_in_update);
router.post('/fabric/fabric_in_list', auth.requireLogin, auth.requireRole(15), fabric.fabric_in_list);
router.get('/fabric/out', auth.requireLogin, auth.requireRole(16), fabric.out);
router.post('/fabric/fabric_out', auth.requireLogin, auth.requireRole(16), fabric.fabric_out);
router.post('/fabric/fabric_out_update', auth.requireLogin, auth.requireRole(16), fabric.fabric_out_update);
router.post('/fabric/fabric_out_list', auth.requireLogin, auth.requireRole(16), fabric.fabric_out_list);
router.get('/fabric/stock', auth.requireLogin, auth.requireRole(2), fabric.stock);
router.post('/fabric/stock/search', auth.requireLogin, fabric.stock_search);

//Cut Sub Menu
router.get('/cut', auth.requireLogin, auth.requireRole(4), cut.cut);
router.post('/cut/search', auth.requireLogin, auth.requireRole(4), fabric.order_search);
router.post('/cut/order_detail', auth.requireLogin, auth.requireRole(4), cut.order_detail);
router.post('/cut/add', auth.requireLogin, auth.requireRole(4), cut.add);
router.post('/cut/update', auth.requireLogin, auth.requireRole(4), cut.update);
router.post('/cut/list', auth.requireLogin, auth.requireRole(4), cut.list);
router.post('/cut/delete', auth.requireLogin, cut.deleteCut);

//Print Sub Menu
router.get('/print/printout', auth.requireLogin, auth.requireRole(19), print.printout);
router.post('/print/printout/search', auth.requireLogin, print.order_search);
router.post('/print/printout/order_detail', auth.requireLogin, print.order_detail);
router.post('/print/printout/add', auth.requireLogin, print.add_printout);
router.post('/print/printout/update', auth.requireLogin, print.update_printout);
router.post('/print/printout/list', auth.requireLogin, print.list_printout);

router.get('/print/printreturn', auth.requireLogin, auth.requireRole(19), print.printreturn);
router.post('/print/printreturn/search', auth.requireLogin, print.order_search);
router.post('/print/printreturn/order_detail', auth.requireLogin, print.order_detail);
router.post('/print/printreturn/add', auth.requireLogin, print.add_printreturn);
router.post('/print/printreturn/update', auth.requireLogin, print.update_printreturn);
router.post('/print/printreturn/list', auth.requireLogin, print.list_printreturn);

//Wash Sub Menu
router.get('/wash/washout', auth.requireLogin, auth.requireRole(6), wash.washout);
router.post('/wash/washout/search', auth.requireLogin, wash.order_search);
router.post('/wash/washout/order_detail', auth.requireLogin, wash.order_detail);
router.post('/wash/washout/add', auth.requireLogin, wash.add_washout);
router.post('/wash/washout/update', auth.requireLogin, wash.update_washout);
router.post('/wash/washout/list', auth.requireLogin, wash.list_washout);
router.get('/wash/washreturn', auth.requireLogin, auth.requireRole(20), wash.washreturn);
router.post('/wash/washreturn/search', auth.requireLogin, wash.order_search);
router.post('/wash/washreturn/order_detail', auth.requireLogin, wash.order_detail);
router.post('/wash/washreturn/add', auth.requireLogin, wash.add_washreturn);
router.post('/wash/washreturn/update', auth.requireLogin, wash.update_washreturn);
router.post('/wash/washreturn/list', auth.requireLogin, wash.list_washreturn);

//Sew Sub Menu
router.get('/sew/daily', auth.requireLogin, auth.requireRole(7), sew.daily);
router.post('/sew/orderdetail', auth.requireLogin, sew.order_detail);
router.post('/sew/size_list', auth.requireLogin, sew.size_list);
router.post('/sew/daily/add', auth.requireLogin, sew.daily_add);
router.post('/sew/daily/list', auth.requireLogin, sew.daily_list);
router.post('/sew/daily/update', auth.requireLogin, sew.daily_update);
router.post('/sew/daily/remove', auth.requireLogin, sew.daily_remove);
router.post('/sew/daily/upload', auth.requireLogin, sew.daily_upload);

router.get('/sew/hourly', auth.requireLogin, auth.requireRole(21), sew.hourly);
router.post('/sew/hourly/add', auth.requireLogin, sew.hourly_add);
router.post('/sew/hourly/list', auth.requireLogin, sew.hourly_list);
router.post('/sew/hourly/update', auth.requireLogin, sew.hourly_update);
router.post('/sew/hourly/remove', auth.requireLogin, sew.hourly_remove);

//Iron Sub Menu
router.get('/iron', auth.requireLogin, auth.requireRole(8), iron.index);
router.post('/iron/search', auth.requireLogin, auth.requireRole(8), iron.order_search);
router.post('/iron/order_detail', auth.requireLogin, auth.requireRole(8), iron.order_detail);
router.post('/iron/add', auth.requireLogin, auth.requireRole(8), iron.add_iron);
router.post('/iron/update', auth.requireLogin, auth.requireRole(8), iron.update_iron);
router.post('/iron/delete', auth.requireLogin, iron.delete_iron);
router.post('/iron/list', auth.requireLogin, auth.requireRole(8), iron.list_iron);

//Inspection Sub Menu
router.get('/inspection', auth.requireLogin, auth.requireRole(9), inspection.index);
router.post('/inspection/search', auth.requireLogin, inspection.order_search);
router.post('/inspection/order_detail', auth.requireLogin, inspection.order_detail);
router.post('/inspection/add', auth.requireLogin, inspection.add_inspection);
router.post('/inspection/update', auth.requireLogin, inspection.update_inspection);
router.post('/inspection/delete', auth.requireLogin, inspection.delete_inspection);
router.post('/inspection/list', auth.requireLogin, inspection.list_inspection);

//Common
router.post('/common/order_fabric', auth.requireLogin, common.order_fabric);
module.exports = router;