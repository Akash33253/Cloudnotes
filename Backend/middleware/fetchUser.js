const jwt = require('jsonwebtoken');
const JWT_SECRET = 'akashgtcatopk';

const fetchUser = (req,res,next)=>{
    try {
        let token = req.header('auth-token');
        if(token){
            const data = jwt.verify(token,JWT_SECRET)
            req.user = data.user;
            next();
        }
        else{
            return res.json({
                message: "please provide valid token"
            })
        }
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}


module.exports = fetchUser;