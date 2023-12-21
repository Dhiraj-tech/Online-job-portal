import express from "express";
import { contactCtrl } from "../../controllers/cms/index.js";

const router = express.Router()

router.get('/', contactCtrl.index)

router.delete('/:id', contactCtrl.destroy)

export default router
