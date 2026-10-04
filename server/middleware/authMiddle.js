import jwt from 'jsonwebtoken';

export const authMiddleWare = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json({
                message : "authHeader is missing"
            })
        }

        const token = authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({
                message : "token is missing"
            })
        }

        const decode = jwt.verify(
            token , 
            process.env.JWT_SECRET
        )

        req.user = decode

        next()

    }
    catch(e){
        console.error("JWT ERR" , e);
        res.status(400).json({
            message : "Invalid or expired token"
        })
        
    }

}