import bcrypt from "bcryptjs"
import { genPassword } from "../../lib/function.js"
import { User } from "../../models/user.model.js"

class ProfileController {

    details = async(req,res,next) => {
        try{
            res.json(req.user)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    edit = async(req,res,next) => {
        try{
            const {name, email, bio} = req.body

            await User.findByIdAndUpdate(req.uid, {name,email, bio})

            res.json({
                success: 'Profile updated'
            })

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    password = async(req,res,next) => {
        try{
            const {old_password, new_password, confirm_password} = req.body

            if (await bcrypt.compare(old_password, req.user.password)){
                if (new_password == confirm_password){
                    const hash = await genPassword(new_password)
                    await User.findByIdAndUpdate(req.uid, {password:hash})

                    res.json({
                        success: 'Password updated'
                    })

                }else{
                    next({
                        message: 'The password is not confirmed',
                        status: 422
                    })
                }

            }else{
                next({
                    message: 'The old password is not correct',
                    status: 422
                })
            }

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }   


}

export default new ProfileController