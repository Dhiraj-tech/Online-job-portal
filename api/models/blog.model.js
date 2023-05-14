import { model, Schema } from "mongoose"

export const Blog = model('Blog', new Schema({
    title:{
        type: String,
        required: true,
    },    
    description:{
        type: String,
        required: true,
    },
    images:{
        type: [String],
        required: true,
    },

}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
