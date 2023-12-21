import mongoose from "mongoose"
import { Job } from "../../models/index.js"

class JobsController{

    latest = async(req,res,next) =>{
        try{
            const jobs = await Job.aggregate([
                {$match: {status: true}},
                {$sort : {createdAt: -1}}
            ]).exec()

            res.json(jobs)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    byId = async(req,res,next) =>{
        try{
            const job = (await Job.aggregate([
                {$match: {status: true, _id: new mongoose.Types.ObjectId(req.params.id)} },
                {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
            ]).exec()).pop()

            if(job) {
                const similar = await Job.find({category_id: job.category_id,
                    status: true, _id: {$ne: new mongoose.Types.ObjectId(job._id)}}).exec()
        
                

                res.json({...job, similar})
            }else{
                next({
                    message: 'Job not found', 
                    status: 404})
            }
           

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    byCategoryId = async(req,res,next) =>{

        try{
            const jobs = await Job.find({category_id: new mongoose.Types.
                ObjectId(req.params.id),status: true }).exec()

                res.json(jobs)
        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    byCompanyId = async(req,res,next) =>{
        try{
            const jobs = await Job.find({company_id: new mongoose.Types.
                ObjectId(req.params.id),status: true }).exec()

                res.json(jobs)
        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    byTerm = async(req,res,next) =>{
        try{
            const jobs = await Job.find({status: true, title: {$regex: req.
                query.term, $options: 'i'}}).exec()

            res.json(jobs)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    
}

export default new JobsController
