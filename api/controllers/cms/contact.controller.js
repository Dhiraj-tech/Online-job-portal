import { Contact } from "../../models/index.js"

class contactController {

    index = async(req,res,next)=>{
        try{
            const contact = await Contact.find()
            res.json(contact)
        }catch(e){
            next({message: 'problem while processing request', status: 400})
        }
    }
    
    store = async(req,res,next)=>{
        try{
            const {name,email,subject,message} = req.body

            await Contact.create({name,email,subject,message})
            
            res.status(201).json({
                success:'Your response has been saved successfully'
            })
            

        }catch(e){
            console.error(e)
            next({message: 'problem while processing request', status: 400})
        }
    }


    destroy = async(req,res,next)=>{
        try{
            await Contact.findByIdAndDelete(req.params.id)
            res.json({
                success:'Contact removed'
            })
        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }
}

export default new contactController
