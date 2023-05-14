import express from "express"
import { listCtrl, jobsCtrl } from "../../controllers/front/index.js"

const router = express.Router()

router.get('/', listCtrl.companies)

router.get('/:id', listCtrl.companyById)

router.get('/:id/jobs', jobsCtrl.byCompanyId)    

export default router