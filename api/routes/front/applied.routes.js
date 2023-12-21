import express from "express"
import { appliedsCtrl } from "../../controllers/front/index.js"
import { resumeUpload } from "../../lib/function.js"

const router = express.Router()

const mimeList = ['application/pdf']

router.route('/')
    .get(appliedsCtrl.index)
    .post(resumeUpload(mimeList).array('files'), appliedsCtrl.store)

router.route('/:id')
    .get(appliedsCtrl.show)
    .delete(appliedsCtrl.destroy)

router.delete('/:id/resume/:filename', appliedsCtrl.resume)

export default router