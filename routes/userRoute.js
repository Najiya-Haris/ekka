const express= require('express')
const user_route=express()
const session=require('express-session')
const Auth=require("../middlewear/Auth")
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const config=require('../config/config')
user_route.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:false
}))

user_route.set('view engine','ejs')
user_route.set('views','./views/user')

const bodyParser=require('body-parser')
user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({ extended: true }))

const userController=require('../controllers/userControllers')


user_route.get('/',userController.loadHome)
user_route.get('/home', userController.loadHome);

user_route.get('/login',Auth.isLogout,userController.loginLoad)
user_route.post('/login',userController.verifyLogin)
user_route.get('/register',userController.loadRegister)
user_route.post('/register',userController.insertUser)

user_route.get('/verify',userController.loadVerfication)
user_route.post('/verify',userController.verifyLoad)

user_route.get('/product',userController.loadProducts)

user_route.get('/logout',Auth.isLogin,userController.userLogout);
user_route.get('/showProduct',productController.productDetails)

user_route.get('/profile',Auth.isLogin,userController.loadProfile);



user_route.get('/forget',Auth.isBlock,userController.forgetLoad)

user_route.get('/loadchange',Auth.isBlock,userController.loadchangePasswod )
user_route.post('/forget',Auth.isBlock,userController.forgetVerify)
user_route.post('/verifyotp',Auth.isBlock,userController.verifyForgetOtp )
user_route.post('/changePassword',Auth.isBlock,userController.changePassword )

user_route.get('/cart',cartController.loadCart)
user_route.post('/addtocart',cartController.addToCart)



module.exports=user_route;