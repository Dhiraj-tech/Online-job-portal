import express from "express"
import { listCtrl, jobsCtrl } from "../../controllers/front/index.js"

const router = express.Router()

router.get('/', listCtrl.categories)

router.get('/:id', listCtrl.categoryById)

router.get('/:id/jobs', jobsCtrl.byCategoryId)
    

export default router