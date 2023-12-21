import express from "express"
import jobRoutes from "./jobs.routes.js"
import categoryRoutes from "./categories.routes.js"
import companyRoutes from "./companies.routes.js"
import profileRoutes from "./profile.routes.js"
import { auth } from "../../lib/function.js"
import contactRoutes from "./contact.routes.js"
import appliedRoutes from "./applied.routes.js"
import blogRoutes from "./blogs.routes.js"

const router = express.Router()

router.use('/profile', auth, profileRoutes)

router.use('/job', jobRoutes)

router.use('/category', categoryRoutes)

router.use('/company', companyRoutes)

router.use('/contacts',contactRoutes)

router.use('/applieds', appliedRoutes)

router.use('/blogs', blogRoutes)

export default router