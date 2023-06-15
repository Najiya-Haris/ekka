const express = require('express');
const admin_route = express();
const Auth=require("../middlewear/adminAuth")
const session = require('express-session');
const config = require('../config/config');
const multer = require('multer');
const update = require('../config/multer');
const adminController = require('../controllers/adminController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
//const bodyParser = require('body-parser');
admin_route.use(express.json())
admin_route.use(express.urlencoded({ extended: true })); // Move this line above the session middleware

admin_route.use(
  session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 604800000,
    },
  })
);

admin_route.set('view engine', 'ejs');
admin_route.set('views', './views/admin');

admin_route.get('/',Auth.isLogout,adminController.loadLogin);
admin_route.post('/',adminController.verifyLogin);
admin_route.get('/dashboard',Auth.isLogin,adminController.loadDashboard);
admin_route.get('/logout',Auth.isLogin,adminController.adminLogout)

admin_route.get('/userList',Auth.isLogin,adminController.newUserLoad);
admin_route.get('/blockUser',Auth.isLogin,adminController.block)
admin_route.get('/unblockUser',Auth.isLogin,adminController.unblock)




admin_route.get('/category',Auth.isLogin, categoryController.loadCategory);
admin_route.post('/category',categoryController.insertCategory);
admin_route.get('/category/:id',Auth.isLogin,categoryController.editCategory);
admin_route.post('/updateCategory',categoryController.updateCategory);
admin_route.get('/deleteCategory',Auth.isLogin,categoryController.deleteCategory);


admin_route.get("/productList", Auth.isLogin, productController.loadProductlist);
admin_route.post("/productList", update.upload.array("image", 10), productController.insertProduct);
admin_route.get('/deleteProduct',Auth.isLogin,productController.deleteProduct);
admin_route.get('/editProductList',Auth.isLogin,productController.editproduct);
admin_route.post("editproductList/:id", update.upload.array("image", 10), productController.insertProduct);
admin_route.get('/deleteimg/:prodid',Auth.isLogin,productController. deleteimage);
admin_route.post("/editproductList/updateimage/:id", update.upload.array("image"), productController.updateimage);







admin_route.get('*',(req,res)=>{
  res.redirect('/admin')
});
module.exports = admin_route;
