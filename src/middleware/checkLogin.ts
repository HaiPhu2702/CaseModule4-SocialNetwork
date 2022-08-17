import {User} from "../schema/user.model";
import bcrypt from "bcrypt"
import {AuthController} from "../controller/auth.controller";

export class CheckLogin {
    static async checkUserOrAdminToDirectional(req, res, next) {

            const user = await User.findOne({username: req.body.username});
            if (user) {
                const comparePass = await bcrypt.compare(req.body.password, user.password);
                if (!comparePass) {
                    return res.render('./user/login',{registerSuccess:'none',
                                                        wrongPassword:'block'})
                }
                let payload = {
                    user_id: user.id,
                    username: user.username,
                    admin: user.admin,
                    google_id: user.google_id
                }

                await AuthController.createTokenAndSetCookie(req, res, payload)
                if (user.admin === true) {
                   res.redirect("/auth/admin")
                } else {
                    res.redirect("/auth/user")
                }
            } else {
                return res.json({err: 'wrong user'});
            }
    }
}
