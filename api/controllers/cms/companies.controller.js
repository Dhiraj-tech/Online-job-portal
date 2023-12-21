import { Company } from "../../models/index.js"

class CompaniesController {

    index = async(req,res,next)=>{
        try{
           const companies = await Company.find()
           res.json(companies)

        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
    store = async(req,res,next)=>{
        try{
            const {name,slug,status} = req.body
            await Company.create({name,slug,status})
            res.json({
                success:'Company created'
            })
        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
    show = async(req,res,next)=>{
        try{
            const company = await Company.findById(req.params.id)
            res.json(company)

        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
    update = async(req,res,next)=>{
        try{
            const {name,slug,status} = req.body
            await Company.findByIdAndUpdate(req.params.id,{name,slug,status})
            res.json({
                success:'Company updated'
            })
        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
    destroy = async(req,res,next)=>{
        try{
            await Company.findByIdAndDelete(req.params.id)
            res.json({
                success:'Company removed'
        })
        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
}

export default new CompaniesController