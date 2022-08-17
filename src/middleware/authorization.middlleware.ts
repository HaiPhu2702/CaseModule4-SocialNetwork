
import jwt from "jsonwebtoken"
export class Auth{

    static async isAdmin(req,res,next){

        let accessToken= req.headers.cookie.cookie_user;

        if(accessToken){
            //tien hanh giai ma
            jwt.verify(accessToken,process.env.NUMBER_SECRET_TOKEN,(err,decoded)=>{
                if(err){
                    return res.json({message:err.message})
                }else {
                    if(decoded.admin===true){
                        next();
                    }else {
                        res.json({message:"ko du quyen"})
                    }
                }
            })
        }else {
            return  res.json({message:"no access token"})
        }

    }



}
