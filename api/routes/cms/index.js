import express from "express";
import { adminUser } from "../../lib/function.js";
import customerRoutes from "./customer.routes.js"
import categoriesRoutes from "./categories.routes.js"
import companyRoutes from "./companies.routes.js"
import jobsRoutes from "./jobs.routes.js"
import contactRoutes from "./contact.routes.js"
import blogsRoutes from "./blogs.routes.js"
import appliedRoutes from "./applied.routes.js"

const router = express.Router()

router.use('/customers', customerRoutes)
router.use('/categories', categoriesRoutes)
router.use('/companies', companyRoutes)
router.use('/jobs', jobsRoutes)
router.use('/contacts', contactRoutes)
router.use('/blogs', blogsRoutes)
router.use('/applieds', appliedRoutes)

export default router
