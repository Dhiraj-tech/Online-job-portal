import mongoose, { model, Schema } from "mongoose"

export const Job = model('Job', new Schema({
    title:{
        type: String,
        required: true,
    },
    experience:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    
    description:{
        type: String,
        required: true,
    },
    
    category_id:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"categories",
    },

    company_id:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"companies",
    },
    
    qualification:{
        type: String,
        required: true,
    },
    offersalary:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: true,
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
