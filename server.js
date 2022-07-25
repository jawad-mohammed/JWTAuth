//JWT auth,
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<JWT TOKEN code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const pool = require('../database')
const jwtHelper = require('../utils/jwtHelpers')



//register new user 
router.post('/api/v1/register',async(req,res)=>{
//check in database with email if exists then throw error
const verifyUser = await pool.query(`select * from customerdetailslogin where email = $1`,
[req.body.email])
if(verifyUser.rows.length>0) return res.json(`user already exists`)
//hash the password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const newUser = await pool.query(`insert into customerdetailslogin(name,email,password,confirmpassword,phonenum)
    values($1,$2,$3,$4,$5)returning *`,
        [req.body.name,req.body.email,hashedPassword,req.body.confirmpassword,req.body.phonenum])
        
const jwtToken = jwtHelper(newUser.rows[0].userid)
return res.json({jwtToken})



})

//returning user  take only useremai land password 

router.post('/api/v1/login',async(req,res)=>{
    // user must be stored in database
       const checkUser = await pool.query(`select * from customerdetailslogin where email =$1`,[req.body.email])
     if(checkUser.rows.length === 0) return res.json(`user not exists`)

    //get the useremail password and verify in database comapre user password with database password
    const validPassword = await bcrypt.compare(req.body.password,checkUser.rows[0].password)
   
    
    
    
    
    //it verifies the otp with node generated otp
//    const val = Math.floor(1000 + Math.random() * 9000);
//     console.log(val);
//      res.json(val)
//      const verifyToken = (req.body.token=== 123)
// if(!verifyToken) return res.json('its false token')

     if(!validPassword) return res.json(`invalid password`)
    //if(!verifyToken) return res.json('invalid token') 
    
        const jwtToken = jwtHelper(checkUser.rows[0].userid)
   return res.json({myJwtToken:jwtToken})
})





 //it verifies the otp with node generated otp
 //it verifies the otp with node generated otp
 var val = Math.floor(1000 + Math.random() * 9000);
console.log(val);

router.post('/api/v1/otp',(req,res)=>{
//res.json(val)

if(req.body.token === val){
    return res.json(val)
}


})






router.get('/api/v1/get',async(req,res)=>{
    const getAllUsers = await pool.query(`select * from customerdetailslogin`)
   res.json(getAllUsers.rows)

})



module.exports = router

