import { model, Schema } from "mongoose"

export const User = model('User', new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    
    bio:{
        type: String,
        required: true,
    },
    
    status:{
        type: Boolean,
        default: true,
        required: true,
    },
    type:{
        type: String,
        required: true,
        enum: ['Admin','Customer'],
        default: 'Customer'
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
