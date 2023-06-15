const isLogin = async (req, res, next) => {
    try {
      if (req.session.Auser_id) {
        next();
      } else {
        res.redirect("/admin");
        // next()
      }
     
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const isLogout = async (req, res, next) => {
    try {
      if (req.session.Auser_id) {
        res.redirect("/admin/dashboard");
      }else{
      next();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  module.exports={

    isLogin,
    isLogout
  }