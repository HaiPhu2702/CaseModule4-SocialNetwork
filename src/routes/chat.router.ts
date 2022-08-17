

import {Router} from "express";
import {ChatController} from "../controller/chat.controller";



const router = Router();

let chatController = new ChatController();

router.get('/:username', (req, res, next) => {
    chatController.getMessage(req, res, next)
})

// router.post("/message",chatController.saveMessage)


export default router
