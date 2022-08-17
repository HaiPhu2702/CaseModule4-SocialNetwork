import {Router} from "express";
import {UserController} from "../controller/user.controller";
import wrapperError from "../containsError/error";
import multer from 'multer'
import path from "path";
import * as fs from "fs";
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname,'../../../src/public', '/img/uploads'));
    },
    //add back the extension
    filename: function (request, file, callback) {
        callback(null,file.originalname);

    },
});

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1000000,
    },
});



const userRoutes = Router();

userRoutes.post('/upload/photo',upload.single('image'),async(req, res) => {
    res.redirect("/auth/user")
})
userRoutes.get('/upload/photo',(req, res) => {
   // const targetPath = path.join(__dirname, "../../../src/public/img/uploads/img1.png");
  res.sendFile(path.join(__dirname, "../../../src/public/img/uploads/img1.png"));
})


userRoutes.get("/:username", wrapperError((UserController.PersonalUser)))

userRoutes.post("/add/status-personal", wrapperError((UserController.addStatusInPersonal)))
userRoutes.post('/add/status-home', wrapperError((UserController.addStatusInHome)))


userRoutes.get("/delete/:id", wrapperError((UserController.deleteStatusInPersonal)))


userRoutes.get("/update/:id", wrapperError((UserController.updateStatusInPersonal)))
userRoutes.post("/update", wrapperError((UserController.updateStatusInPersonal)))



export default userRoutes