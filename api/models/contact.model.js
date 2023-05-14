import { model, Schema } from "mongoose"

export const Contact = model('Contact', new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    
    
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
