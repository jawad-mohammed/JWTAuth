const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//middleware
app.use(cors())
app.use(express.json())

//auth Routes
app.post('/api/auth/login',async(req,res)=>{
    try {
        const checkExistingUser = await pool.query(`select * from customerdetailslogin where email =$1`,
        [req.body.email])
       if(checkExistingUser.rows.length>0){
    res.json('user exists in database')
       }
const salt = await bcrypt.genSalt(10)
const bcryptPassword = await bcrypt.hash(password,salt)

const isSalt = await  bcrypt.genSalt(10)
const bcryptconfirmPassword = await bcrypt.hash(confirmPassword,isSalt)

const loginUser = await pool.query(`insert into customerdetailslogin(name,email,password,confirmpassword)values($1,$2,$3,$4)returning *`,
[req.body.name,req.body.email,bcryptPassword,bcryptconfirmPassword])
res.json(loginUser)


    } catch (error) {
        console.log(error);
    }
})

