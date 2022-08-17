
import mongoose, {Schema} from "mongoose";


const commentSchema = new mongoose.Schema({
    idStatus: String,
    content: String,
    userComment: String
})

const Comment = mongoose.model("Comment", commentSchema)

export {Comment};
