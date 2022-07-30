import { Router } from "express"
import { resumeController } from "../controllers/resume"

const router = Router()

router.get("/", resumeController.show)
router.get("/raw", resumeController.showRaw)

export const resumeRoutes = router