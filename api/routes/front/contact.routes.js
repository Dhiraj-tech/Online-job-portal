import express from "express";
import { contactCtrl } from "../../controllers/cms/index.js";

const router = express.Router()

router.post('/', contactCtrl.store)

export default router
