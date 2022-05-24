const jwt = require('jsonwebtoken')
require('dotenv').config()

function jwtGenerator (customerid){
const payload={
    user: {
        id:customerid
    }
}
return jwt.sign(payload,process.env.jwtSecret,{expiresIn:'1hr'})

}
module.exports = jwtGenerator













