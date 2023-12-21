import { Job } from "../../models/index.js"
import { unlinkSync } from "node:fs" 

class JobsController {

    index = async(req,res,next)=>{
        try{
           const jobs = await Job.aggregate([
            {$lookup: {from: 'categories', localField: 'category_id', foreignField: '_id',
            as: 'category'}},
            {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id',
            as: 'company'}}
           ]).exec()

           res.json(jobs)

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    store = async(req,res,next)=>{
        try{
            const {title, experience, location, description, category_id, company_id,
                qualification, offersalary, status} = req.body

            const images = req.files.map(file => file.path)

            await Job.create({title, experience, location, description, category_id,company_id, 
                qualification, offersalary, status, images})

            res.json({
                success:'Job created'
            })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    show = async(req,res,next)=>{
        try{
            const job = await Job.findById(req.params.id)
            res.json(job)

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    update = async(req,res,next)=>{
        try{
            const {title, experience, location, description, category_id, 
                company_id, qualification, offersalary, status} = req.body

            const job = await Job.findById(req.params.id)

            let images = []
            
            if (req.files.length > 0){
                images = [...job.images, ...req.files.map(file => file.path)]
            }else{
                images = job.images
            }

            await Job.findByIdAndUpdate(req.params.id, {title, experience, location, description, category_id, 
                company_id, qualification, offersalary, images, status})

            res.json({
                success:'job updated'
            })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }
    
    destroy = async(req,res,next)=>{
        try{
            const job = await Job.findById(req.params.id)

            if (job.images.length > 0){
                for (let image of job.images){
                    unlinkSync(image)
                }
            }

            await Job.findByIdAndDelete(req.params.id)

            res.json({
                success:'job removed'
        })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    image = async (req,res,next) => {
        try{
            const job = await Job.findById(req.params.id)

            const index = job.images.findIndex((image) => image.endsWith(req.params.filename))

            if(index > -1){
                if(job.images.length > 1){
                    unlinkSync(job.images[index])
                    let images = job.images
    
                    images.splice(index, 1)
    
                    await Job.findByIdAndUpdate(job._id,{
                        images
                    })
    
                    res.json({
                        success:'Image removed'
                    })
                }else{
                    next({
                        message: 'At least one image is required in the job',
                        status: 403
                    })
                }
                
            }else{
                next({
                    message: 'Image not found',
                    status: 404
                })
            }

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }
}

export default new JobsController