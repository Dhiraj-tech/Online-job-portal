import express from "express"
import { companiesCtrl } from "../../controllers/cms/index.js"

const router = express.Router()

router.route('/')
    .get(companiesCtrl.index)
    .post(companiesCtrl.store)

router.route('/:id')
    .get(companiesCtrl.show)
    .put(companiesCtrl.update)
    .patch(companiesCtrl.update)
    .delete(companiesCtrl.destroy)

export default router