const JWT = require('jsonwebtoken')
require('dotenv').config()

function jwtHelper (userid){
const payload ={
    customerid:{
        id:userid
    }
}

//return JWT.sign(payload,process.env.jwtToken,{expiresIn:'1hr'})  //this is acces token

const accessToken =JWT.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'30s'})  //this is acces token
const refreshToken = JWT.sign(payload,process.env.REFRESH_TOKEN,{expiresIn:'5m'}) //this is refresh token
return {accessToken,refreshToken}

}

module.exports = jwtHelper
