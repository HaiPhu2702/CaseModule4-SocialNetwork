
import mongoose, {Schema} from "mongoose";


const messageSchema = new mongoose.Schema({
    nameSend: String,
    nameReceive: String,
    chat: String ,
    time: {
        type: Date,
        default: Date.now
    },
})

const Message = mongoose.model("Message", messageSchema)

export default Message;
