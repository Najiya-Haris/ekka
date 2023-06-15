const User=require('../Models/userModel')
const bcrypt=require('bcrypt')
const session=require('express-session')

let message

const loadLogin= async(req,res)=>{
    try{
        //console.log('nice');
        res.render('login',{message})
       // message=null
    }catch(err){
        console.log(err.message);
    }
}

const verifyLogin= async(req,res)=>{
    try{
      
        const email=req.body.email
        const password=req.body.password
        
        const userData=await User.findOne({email:email})
        console.log(userData);

        if(userData){
           
            const passwordMatch=await bcrypt.compare(password,userData.password)
            if(passwordMatch){
                console.log('p sucess2');
                console.log(userData.is_admin);
                if(userData.is_admin===0){
                    return res.render('login',{message:'Email and password incorrect'})
                }else{
                    req.session.Auser_id=userData._id
                    res.redirect('/admin/dashboard')
                }
            }else{
                res.render('login',{message:'Email or password is incorrect'})
                console.log('incorrect');
            }
        }else{
            res.render('login',{message:'Email and password incorrect'})
        }


    }catch(err){
        console.log(err.message);
    }
}

// const loadDashboard = async (req, res) => {
//     try {
//       const userData = await usermodel.findById({ _id: req.session.user_id });
//       res.render('dashboard', { admin: userData });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

const loadDashboard = async (req, res) => {
    try {
     const adminData = await User.findById({ _id: req.session.Auser_id });
      res.render('dashboard',{admin: adminData});
    } catch (error) {
      console.log(error.message);
    }
  };
  


  const newUserLoad= async(req,res)=>{
    try{
        const adminData =await User.findById({_id: req.session.Auser_id})
        const userData=await User.find({is_admin:0})
        res.render('userList',{users:userData,activePage: 'userList',admin:adminData})
    }catch(err){
        console.log(err.message);
    }
  }


  const adminLogout=async(req,res)=>{
try{
    req.session.destroy();
    res.redirect('/admin')
}catch(error){
    console.log(error.message);
}
  }


  const block=async(req,res)=>{
    try{
        const userData=await User.findByIdAndUpdate(req.query.id,{$set:{is_block:true}});
        //req.session.users=null
        res.redirect('/admin/userList')
    }catch(error){
        console.log(error.message);
    }
  }

  const unblock=async(req,res)=>{
    try{
        const userData=await User.findByIdAndUpdate(req.query.id,{$set:{is_block:false}});
       // req.session.users=null
        res.redirect('/admin/userList')
    }catch(error){
        console.log(error.message);
    }
  }

  

 

module.exports={
    loadLogin,
    verifyLogin,
    loadDashboard,
    newUserLoad,
    adminLogout,
    block,
    unblock
}