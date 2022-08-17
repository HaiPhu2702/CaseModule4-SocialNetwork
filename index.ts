import express from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import passport from "./src/middleware/passport.google"
import authRoutes from "./src/routes/auth.router"
import startRoutes from "./src/routes/auth.router"
import userRoutes from "./src/routes/user.router";
import appRoot from "app-root-path";
import errorToSlack from 'express-error-slack'
import cors from "cors"
import path from "path";
import session from "express-session";
import chatRouter from "./src/routes/chat.router";
import {Comment} from './src/schema/comment'




const port = 3000;

const app = express();

import http from 'http';
const server = http.createServer(app);
import {Server} from "socket.io";


import {Status} from "./src/schema/status.model";
import Message from "./src/schema/message";

const io = new Server(server);


//set view engine
app.set('view engine', 'ejs');
app.set("views", './src/views')

//cau hinh bien moi truong + connect DB + thang sua truoc 1 buoc
dotenv.config()
mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("connect success")
})

//static file
const rootPath = appRoot.path;
let publicPath = path.join(rootPath, "src", "public");
app.use(express.static(publicPath));

//tranh tan cong cors + cau hinh body+ passport
app.use(cors())
app.use(bodyParser.json())
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, maxAge: 60 * 60}
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize());
app.use(passport.session());

//cac router

app.use("/", startRoutes);
app.use("/auth", authRoutes);
app.use('/user', userRoutes)
app.use('/chat', chatRouter);


io.sockets.on('connection', (socket) => {

    socket.on('like', async Datalike => {

        await Status.updateOne({_id: Datalike.idStatus}, {like: (+Datalike.numberLike + 1)});

        let StatusLike = await Status.findOne({_id: Datalike.idStatus})

        io.sockets.emit('updateLike', {
            idStatus: Datalike.idStatus,
            numberLike: StatusLike.like
        })
    })
    socket.on('chat', async UserChat => {
        console.log(UserChat)
        let chat = new Message({
            nameSend: UserChat.nameSend,
            nameReceive: UserChat.nameReceive,
            chat: UserChat.message
        })
        await chat.save()
        socket.broadcast.emit('user-chat-with-you', UserChat.message)
    })

    socket.on('comment',async dataComment => {
        let comment = new Comment({
            idStatus:dataComment.idStatus,
            content:dataComment.content,
            userComment:dataComment.userComment
        })
        await comment.save()
        io.sockets.emit('comment2',dataComment)
    })
});







//cac router bi loi trong qua trinh chay auto vao day + ve slack
app.use(errorToSlack({webhookUri: "https://hooks.slack.com/services/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"}))
app.use((err, req, res, next) => {
    if (err) {
        res.json({message: err.message})
    }
})


server.listen(port, () => {
    console.log("http://localhost:" + port)
})



