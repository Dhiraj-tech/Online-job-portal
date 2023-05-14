import express from "express"
import { blogsCtrl } from "../../controllers/cms/index.js"

const router = express.Router()

router.get('/', blogsCtrl.index)
router.get('/:id', blogsCtrl.show)
   

export default router