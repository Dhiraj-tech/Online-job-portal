import { Blog } from "../../models/index.js"

class BlogsController {

    index = async(req,res,next)=>{
        try{
           const blogs = await Blog.find()
           res.json(blogs)

        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }

    show = async(req,res,next)=>{
        try{
            const blog = await Blog.findById(req.params.id)
            res.json(blog)

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    
}

export default new BlogsController