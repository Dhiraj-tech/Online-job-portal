import express from "express"
import { jobsCtrl } from "../../controllers/cms/index.js"
import { fileUpload } from "../../lib/function.js"

const router = express.Router()

const mimeList = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

router.route('/')
    .get(jobsCtrl.index)
    .post(fileUpload(mimeList).array('files'), jobsCtrl.store)

router.route('/:id')
    .get(jobsCtrl.show)
    .put(fileUpload(mimeList).array('files'), jobsCtrl.update)
    .patch(fileUpload(mimeList).array('files'), jobsCtrl.update)
    .delete(jobsCtrl.destroy)

router.delete('/:id/image/:filename', jobsCtrl.image)

export default router