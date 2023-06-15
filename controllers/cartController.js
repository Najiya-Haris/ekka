const Category = require("../Models/categoryModel");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");
const Cart = require("../Models/cartModel");
// const Address=require('../Models/addressModel');
const { render } = require("../routes/userRoute");


const loadCart = async (req, res) => {
  try {
    const session = req.session.user_id
    let userName = await User.findOne({ _id: req.session.user_id });
    let cartData = await Cart.findOne({ userId: req.session.user_id }).populate(
      "products.productid"
    );
    if (req.session.user_id) {
      if (cartData) {
        if (cartData.products.length > 0) {
          const products = cartData.products;
          const total = await Cart.aggregate([
            { $match: { userId: req.session.user_id } },
            { $unwind: "$products" },
            {
              $group: {
                _id: null,
                total: { $sum: { $multiply: ["$products.productPrice", "$products.count"] } },
              },
            },
          ]);
        

          const Total = total.length > 0 ? total[0].total : 0; 
           const totalAmount = Total+80;   
          const userId = userName._id;
          res.render("cart-page", { products: products, Total: Total, userId ,session,totalAmount});
        } else {
          res.render("empty-cart-page", {
            userName,
            session,
            message: "No Products Added to cart !",
          });
          return
        }
      } else {
        res.render("empty-cart-page", {
          userName,
          session,
          message: "No Products Added to cart",
        });
        return
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error.message);
  }
};


const addToCart = async (req, res) => {
    try {
      const userId = req.session.user_id
      const userData = await User.findOne({ _id: userId });
      const productId = req.body.id;
      const productData = await Product.findOne({_id: productId});
  
      const cartData = await Cart.findOne({ userId: userId });
  
      if (cartData) {
       
        const productExists = cartData.products.some(
          (products) => products.productid == productId
        );
  
        if (productExists) {
          await Cart.findOneAndUpdate(
            { userId: userId, "products.productid": productId },
            { $inc: { "products.$.count": 1,"products.$.totalAmount":productData.price } }
          );
        } else {
          await Cart.findOneAndUpdate(
            { userId: userId },
            { 
              $push: { 
                products: { 
                  productid: productId,
                  productPrice: productData.price,
                  totalPrice:productData.price 
                } 
              } 
            }
          );
        }
        
      } else {
        const newCart = new Cart({
          userId: userId,
          username: userData.name,
          products: [{ 
            productid: productId,
            productPrice: productData.price,
            totalPrice:productData.price
          }],
        });
  
        await newCart.save();
      }
      res.json({ success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

module.exports={
    loadCart ,
    addToCart 
}