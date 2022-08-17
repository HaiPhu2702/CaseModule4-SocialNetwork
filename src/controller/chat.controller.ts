import Message from "../schema/message";
import jwt from "jsonwebtoken"
import message from "../schema/message";

export class ChatController {

    getMessage(req, res, next) {
        let nameReceive = req.params.username;
        let Data = req.headers.cookie
        let accessToken = Data.split('=')[1]
        jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                return res.json({message: err.message})
            } else {
                let nameSend = decoded.username;
                let messages1 = await Message.find({
                    nameSend: nameSend,
                    nameReceive: nameReceive
                })
                let messages2 = await Message.find({
                    nameSend: nameReceive,
                    nameReceive: nameSend
                })
                let messages = messages1.concat(messages2);

                // //sap xep tin nhan trong mang messages thu tu theo thoi gian

                for (let i = 0; i < messages.length; i++) {
                    for (let j = i + 1; j < messages.length; j++) {
                        if (messages[j].time < messages[i].time) {
                            let temp = messages[j];
                            messages[j] = messages[i];
                            messages[i] = temp
                        }
                    }
                }
                console.log(messages)
                res.json(messages)
            }


// async saveMessage(req, res) {
// let Data = req.headers.cookie
// let accessToken = Data.split('=')[1]
// jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
// if (err) {
// return res.json({message: err.message})
// } else {
// let idSend = decoded.user_id;
// const messageNew = new Message({
// idSend: idSend,
// idReceive: req.body.idReceive,
// chat: req.body.message
// })
// await messageNew.save();
// res.json("oke");
// }
// })
// }


        })

    }
}