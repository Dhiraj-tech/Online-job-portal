import { model, Schema } from "mongoose"

export const Applied = model('Applied', new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    uploads:{
        type: [String],
        required: true,
    },

}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
