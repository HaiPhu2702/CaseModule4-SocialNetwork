
import mongoose, {Schema} from "mongoose";


const statusSchema = new mongoose.Schema({
    content: String,

    like: {
        type: Number,
        default: 0
    },

    user: {type:Schema.Types.ObjectId,ref:'User'}
})

const Status = mongoose.model("Status", statusSchema)

export {Status};
