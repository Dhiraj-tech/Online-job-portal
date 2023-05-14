import { Blog } from "../../models/index.js"
import { unlinkSync } from "node:fs" 

class BlogsController {

    index = async(req,res,next)=>{
        try{
           const blogs = await Blog.find()
           res.json(blogs)

        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }

    store = async(req,res,next)=>{
        try{
            const {title, description} = req.body

            const images = req.files.map(file => file.path)

            await Blog.create({title, description, images})

            res.json({
                success:'Blog created'
            })
        }catch(e){
            console.error(e)
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

    update = async(req,res,next)=>{
        try{
            const {title, description} = req.body

            const blog = await Blog.findById(req.params.id)

            let images = []
            
            if (req.files.length > 0){
                images = [...blog.images, ...req.files.map(file => file.path)]
            }else{
                images =  blog.images
            }

            await Blog.findByIdAndUpdate(req.params.id, {title, description, images})

            res.json({
                success:'Blog updated'
            })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }
    
    destroy = async(req,res,next)=>{
        try{
            const blog = await Blog.findById(req.params.id)

            if (blog.images.length > 0){
                for (let image of blog.images){
                    unlinkSync(image)
                }
            }

            await Blog.findByIdAndDelete(req.params.id)

            res.json({
                success:'Blog removed'
        })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    image = async (req,res,next) => {
        try{
            const blog = await Blog.findById(req.params.id)

            const index = blog.images.findIndex((image) => image.endsWith(req.params.filename))

            if(index > -1){
                if(blog.images.length > 1){
                    unlinkSync(blog.images[index])
                    let images = blog.images
    
                    images.splice(index, 1)
    
                    await Blog.findByIdAndUpdate(blog._id,{
                        images
                    })
    
                    res.json({
                        success:'Image removed'
                    })
                }else{
                    next({
                        message: 'At least one image is required in the blog',
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

export default new BlogsController