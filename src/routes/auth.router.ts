import express from "express";
import passport from "passport"

const router = express.Router();
import {Auth} from "../middleware/authorization.middlleware"
import wrapperError from "../containsError/error"
import {AuthController} from "../controller/auth.controller"
import {UserController} from "../controller/user.controller";
import {CheckLogin} from "../middleware/checkLogin";

// router.use("/",Auth.isAdmin)


router.get('/', wrapperError(AuthController.login))


router.post('/login', wrapperError(CheckLogin.checkUserOrAdminToDirectional))
router.get('/user', wrapperError(UserController.homeUser))
router.get('/admin', wrapperError(UserController.homeAdmin))
router.get('/admin/delete/:username', wrapperError(UserController.deleteUser))


router.get('/logout', wrapperError(AuthController.logout))


router.get('/register', wrapperError(AuthController.register))
router.post("/register", wrapperError(AuthController.register));


router.get("/error", wrapperError(AuthController.error));



router.post('/admin/grant',wrapperError(AuthController.grantAdminOrUser))


router.get('/google', passport.authenticate('google', {scope: ['profile']}));
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
    async function (req, res) {


        res.redirect('/auth/user')
    });


export default router