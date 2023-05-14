import express from "express"
import { jobsCtrl } from "../../controllers/front/index.js"

const router = express.Router()

router.get('/latest', jobsCtrl.latest)

router.get('/search', jobsCtrl.byTerm)

router.get('/:id', jobsCtrl.byId)


export default router