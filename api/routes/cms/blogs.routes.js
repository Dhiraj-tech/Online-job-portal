import express from "express"
import { blogsCtrl } from "../../controllers/cms/index.js"
import { fileUpload } from "../../lib/function.js"

const router = express.Router()

const mimeList = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

router.route('/')
    .get(blogsCtrl.index)
    .post(fileUpload(mimeList).array('files'), blogsCtrl.store)

router.route('/:id')
    .get(blogsCtrl.show)
    .put(fileUpload(mimeList).array('files'), blogsCtrl.update)
    .patch(fileUpload(mimeList).array('files'), blogsCtrl.update)
    .delete(blogsCtrl.destroy)

router.delete('/:id/image/:filename', blogsCtrl.image)

export default router