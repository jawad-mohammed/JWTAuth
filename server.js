
const express = require('express')
const app = express()

const cors = require('cors')
const pool = require('./database')
const bcrypt = require('bcrypt')
const jwtGenerator = require('./utils/jwtHelpers')

app.use(cors())
app.use(express.json())
//routes
app.post('/registration',async(req,res)=>{
    try {
//verify the existing user from database
const verifyCustomer = await pool.query(`select * from customerdetailslogin where email = $1`,
[req.body.email])

if(verifyCustomer.rows.length > 0) return res.json('user already exists please try another one')

//Hasing password
//for password1
       const salt= await bcrypt.genSalt(10)
       const bcryptPassword = await bcrypt.hash(req.body.password,salt)
//for password2
       const isSalt = await  bcrypt.genSalt(10)
const bcryptConfirmPassword = await bcrypt.hash(req.body.confirmPassword,isSalt)

const newRegistration = await pool.query
        (`insert into customerdetailslogin
        (name,email,password,confirmpassword)values($1,$2,$3,$4) returning *`,
        [req.body.name,req.body.email,bcryptPassword,bcryptConfirmPassword])
//jwt 
const jwtToken = jwtGenerator(newRegistration.rows[0].customerid)
return res.json({jwtToken})


    } catch (error) {
        console.log(error);
    }
})



app.get('/registration',async(req,res)=>{
    const allUsers = await pool.query(`select * from customerdetailslogin `)
    res.json(allUsers.rows)

})










app.listen(5000,()=>{
    console.log(`port is listening on 5000`);
})