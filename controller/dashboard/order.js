var User = require('../../models/user');
var Customer = require('../../models/customer');
var Others = require('../../models/other');
var Yarn = require('../../models/yarn');
var Fabric = require('../../models/fabric');
var Const = require('../../config/const');
var SizeGroup = require('../../models/sizegroup');
var ProductMaterialGroup = require('../../models/productmaterialgroup');
var FinishMaterialGroup = require('../../models/finishmaterialgroup');

var Order = require('../../models/order');
var OrderFabrics = require('../../models/orderfabric');
var OrderDetail = require('../../models/orderdetail');
var Follower = require('../../models/follower');

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var uniqid = require('uniqid');

var OneSignal = require('onesignal-node');
var smtpConfig = require('../../config/smtpConfig');
var nodemailer = require('nodemailer');

exports.list = function(req, res){
  var users, buyercode, customers;
  new Promise((resolve, reject) => {
    User.getUsers(function(err, result){
      if(err){
        res.redirect('/');
      }else{
        users = result.filter(v =>{
          if(v.type == 1) return true;
          else return false;
        });
        resolve(users);
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject) =>{
      Others.getBuyerCode(function(err, result){
        buyercode = result[0];
        resolve(buyercode);
      })      
    })    
  }).then(() =>{
    return new Promise((resolve, reject) => {
      Customer.list(function(err, result){
        if(err){
          res.redirect('/');
        }else{
          customers = result.filter(v =>{
            if(v.type == buyercode.id) return true;
            else return false;
          });
          resolve(customers);
        }
      })
    });
  }).then(()=>{
    Order.getAll(function(err, result){
      res.render('dashboard/order/list', {users: users, customers: customers, list: result});
    })        
  })
  
}
exports.new = function(req, res){
  res.render('dashboard/order/new');
}
exports.order_detail = function(req, res){
  let ordername = req.body.ordername;
  let buyer = req.body.buyer;
  var order, fabriccode, yarncode, fabrictypecode, colorcode, prioritycode, sizegroup, sizecode;
  new Promise((resolve, reject) =>{
    Order.getOrder(ordername, buyer, function(err, result){
      if(err){
        res.render('/');
      }else{
        order = result;
        resolve(order);
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject) =>{
      Others.getOthers({type: Const.codes[9].name}, function(err, result){
        if(err){
          res.render('/');
        }else{
          fabrictypecode = result;
          resolve(fabrictypecode);
        }
      })
    })
  })
  .then(()=>{
    return new Promise((resolve, reject)=>{
      Fabric.getFabrics(function(err, result){
        if(err){
          res.render('/');
        }else{
          fabriccode = result;
          resolve(fabriccode);
        }
      })
    })    
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Yarn.getYarns(function(err, result){
        if(err){
          res.render('/');
        }else{
          yarncode = result;
          resolve(yarncode);
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject) =>{
      Others.getOthers({type: Const.codes[5].name}, function(err, result){
        if(err){
          res.render('/');
        }else{
          colorcode = result;
          resolve(colorcode);
        }
      })
    })    
  }).then(()=>{
    return new Promise((resolve, reject) =>{
      Others.getOthers({type: Const.codes[10].name}, function(err, result){
        if(err){
          res.render('/');
        }else{
          prioritycode = result;
          resolve(prioritycode);
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      SizeGroup.get({customer: order[0].buyer}, function(err, result){
        if(err){
          res.render('/');
        }else{
          let f_result = result.filter(v =>{
            return v.id == order[0].sizegroup;
          });
          sizegroup = f_result[0];
          console.log(sizegroup);
          resolve(sizegroup);
        }
      })
    })
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      Others.getOthers({type: Const.codes[7].name}, function(err, result){
        if(err){
          res.render('/');
        }else{
          sizecode = result;
          resolve(sizecode);
        }
      })
    })
  }).then(()=>{
    res.render('dashboard/order/detail', {
      order: order[0], fabriccode: fabriccode, yarncode: yarncode, fabrictypecode: fabrictypecode, colorcode: colorcode, prioritycode: prioritycode, sizegroup: sizegroup, sizecode:sizecode
    });
  })
}
exports.order_detail_byid = function(req, res){
  Order.getOrderById(req.body.id, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      let order = result[0];
      res.json({isSuccess: true, order: order});
    }
  })
}
exports.order_fabric_add = function(req, res){
  OrderFabrics.addFabric(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, data: result});
    }
  })
}
exports.order_fabric_update = function(req, res){
  OrderFabrics.updateFabric(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_fabric_get = function(req, res){
  OrderFabrics.getFabric(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, fabric: result});
    }
  })
}
exports.order_fabric_remove = function(req, res){
  OrderFabrics.removeFabric(req.body.id, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_fabric_list = function(req, res){
  OrderFabrics.getFabrics(req.body,function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}
exports.order_detail_add = function(req, res){
  OrderDetail.addDetail(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_detail_all = function(req, res){
  OrderDetail.allDetail(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, list: result});
    }
  })
}
exports.order_detail_get = function(req, res){
  OrderDetail.getDetail(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true, detail: result[0]});
    }
  })
}
exports.order_detail_update = function(req, res){
  OrderDetail.updateDetail(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}
exports.order_detail_remove = function(req, res){
  OrderDetail.removeDetail(req.body.id, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{
      res.json({isSuccess: true});
    }
  })
}

exports.group_list = function(req, res){
  var id = req.body.id, groupsize, groupproduct, groupfinish;
  new Promise((resolve, reject) => {
    SizeGroup.get({customer: id}, function(err, result){
      if(err){
        res.json({isSuccess: false});
      }else{        
        groupsize = result;        
        resolve(groupsize);
      }
    })
  }).then(()=>{
    return new Promise((resolve, reject) => {
      ProductMaterialGroup.get({customer: id}, function(err, result){
        if(err){
          res.json({isSuccess: false});
        }else{
          groupproduct = result;
          resolve(groupproduct);
        }
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      FinishMaterialGroup.get({customer: id}, function(err, result){
        if(err){
          res.json({isSuccess: false});
        }else{
          groupfinish = result;
          resolve(groupfinish);
        }
      })
    })
  }).then(()=>{    
    res.json({isSuccess: true, size: groupsize, product: groupproduct, finish: groupfinish});
  })
}

var sendNotification = function(req){
  var myClient = new OneSignal.Client({
    userAuthKey: 'ZTg5ZGM4NDItMjNiNS00NDQ0LWE2Y2EtNGYyNThlNGNmZjgy',
    // note that "app" must have "appAuthKey" and "appId" keys
    app: { appAuthKey: 'OTQ1ZjA3OTUtMWU1YS00MTFiLWIxZmMtZjUyNTA1ZjU3MzYy', appId: 'ff94eaec-20e9-4d21-bbac-e28aeb0fc792' }
  });

  var contents;
  switch (req.cookies.language){
    case 'kor':
      contents={
        en: req.body.handlername + " 이 " + req.body.buyername +"의 새 주문 " + req.body.name +"을 추가 하였습니다. "
      }
      break;
    case 'eng':
      contents={
        en: "[New Order] "+req.body.buyername + ", " + req.body.name
      }
      break;
    case 'spa':
      contents={
        en: "[New Order] "+req.body.buyername + ", " + req.body.name
      }
      break;
  }
  
  var firstNotification = new OneSignal.Notification({
    contents
  });

  firstNotification.setIncludedSegments(['All']);
  myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
    if (err) {
        console.log('Something went wrong...');
    } else {
        console.log(data, httpResponse.statusCode);
    }
  });
}

var sendEmail = function(req){
  Follower.getById(req.body.buyer, function(err, result){
    if(err){
      console.log('Error while getting followers');
    }else{      
      for(var i = 0; i < result.length; i++){
        var smtpTransport = nodemailer.createTransport(smtpConfig);
        var mailOptions;
        switch (req.cookies.language){
          case 'kor':
            mailOptions={
              to : result[i].follower,
              subject : "[새 주문] "+req.body.buyername + ", " + req.body.name,
              html : req.body.handlername + " 이 " + req.body.buyername +"의 새 주문 " + req.body.name +"을 추가 하였습니다. "
              //html: "[New Order] "+body.buyername + ", " + body.name
            }
            break;
          case 'eng':
            mailOptions={
              to : result[i].follower,
              subject : "[New Order] "+req.body.buyername + ", " + req.body.name,
              html : req.body.handlername + " added new Order " + req.body.name +" for "+req.body.buyername
              //html: "[New Order] "+body.buyername + ", " + body.name
            }
            break;
          case 'spa':
            mailOptions={
              to : result[i].follower,
              subject : "[New Order] "+req.body.buyername + ", " + req.body.name,
              html : req.body.handlername + " added new Order " + req.body.name +" for "+req.body.buyername
              //html: "[New Order] "+body.buyername + ", " + body.name
            }
            break;
        }        
        
        smtpTransport.sendMail(mailOptions, function(error, response){
        });
      }
    }
  })  
}

exports.order_add = function(req, res){  
  Order.addOrder(req.body, function(err, result){
    if(err){
      res.json({isSuccess: false});
    }else{      
      sendNotification(req);
      sendEmail(req);      
      res.json({isSuccess: result});
    }
  })
}
exports.order_remove = function(req, res){
  Order.removeOrder(req.body.id, function(err, result){
    if(err){
      res.redirect('/');
    }else{
      res.redirect('/dashboard/order/list');
    }
  })
}
exports.order_image_add = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(fields);
    var filename;
    if(files.file != undefined){
      filename = uniqid();
      var old_path = files.file.path;
      var file_size = files.file.size;
      var file_ext = files.file.name.split('.').pop();    
      var new_path = path.join(appRoot, '/public/uploads/order/image/', filename + '.' + file_ext);
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log('uploading failure!');
            } else {
              console.log('uploading success!');
            }
          });
        });
      });
    }
    Order.addImage(fields.id, filename + '.' + file_ext, function(err, result){
      if(err){
        res.json({isSuccess:false});
      }else{
        res.json({isSuccess:true});
      }
    })
  });
}