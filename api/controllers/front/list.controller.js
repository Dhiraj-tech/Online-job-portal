import { Category, Company } from "../../models/index.js"

class ListController {

    categories = async(req,res,next) => {
        try{
            const categories = await Category.find({status: true}).exec()

            res.json(categories)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    categoryById = async(req,res,next) => {
        try{
            const category = await Category.findOne({status: true, _id: req.params.id }).exec()

            if(category){
                res.json(category)
            }else{
                next({
                    message: 'Category not found', 
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

    companies = async(req,res,next) => {
        try{
            const companies = await Company.find({status: true}).exec()

            res.json(companies)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    companyById = async(req,res,next) => {
        try{
            const company = await Company.findOne({status: true, _id: req.params.id }).exec()

            if(company){
                res.json(company)
            }else{
                next({
                    message: 'Company not found', 
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

}

export default new ListController