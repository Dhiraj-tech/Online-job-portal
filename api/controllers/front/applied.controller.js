// import { Applied } from "../../models/index.js"

// class AppliedsController {

//     store = async(req,res,next)=>{
//         try{
//             const {name,email,message} = req.body

//             const uploads = req.files.map(file => file.path)

//             await Applied.create({name,email,message,uploads})

//             res.json({
//                 success:'Applications has been applied successfully'
//             })
//         }catch(e){
//             console.error(e)
//             next({message:'problem while processing request', status: 400})
//         }
//     }

//     show = async(req,res,next)=>{
//         try{
//             const applied = await Applied.findById(req.params.id)
//             res.json(applied)

//         }catch(e){
//             console.error(e)
//             next({message:'problem while processing request', status: 400})
//         }
//     }

   
    
// }

// export default new AppliedsController





import { Applied } from "../../models/index.js"
import { unlinkSync } from "node:fs" 

class AppliedsController {

    index = async(req,res,next)=>{
        try{
           const applied = await Applied.find()
           res.json(applied)

        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }

    store = async(req,res,next)=>{
        try{
            const {name,email,message} = req.body

            const uploads = req.files.map(file => file.path)

            await Applied.create({name,email,message,uploads})

            res.json({
                success:'Applications has been applied successfully'
            })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    show = async(req,res,next)=>{
        try{
            const applied = await Applied.findById(req.params.id)
            res.json(applied)

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

   
    destroy = async(req,res,next)=>{
        try{
            const applied = await Applied.findById(req.params.id)

            if (applied.uploads.length > 0){
                for (let resum of applied.uploads){
                    unlinkSync(resum)
                }
            }

            await Applied.findByIdAndDelete(req.params.id)

            res.json({
                success:'Job Applied removed'
        })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    resume = async (req,res,next) => {
        try{
            const applied = await Applied.findById(req.params.id)

            const index = applied.uploads.findIndex((resum) => resum.endsWith(req.params.filename))

            if(index > -1){
                if(applied.uploads.length > 1){
                    unlinkSync(applied.uploads[index])
                    let resume = applied.uploads
    
                    resume.splice(index, 1)
    
                    await Applied.findByIdAndUpdate(applied._id,{
                        resume
                    })
    
                    res.json({
                        success:'File removed'
                    })
                }else{
                    next({
                        message: 'At least one image is required in the job',
                        status: 403
                    })
                }
                
            }else{
                next({
                    message: 'File not found',
                    status: 404
                })
            }

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }
}

export default new AppliedsController