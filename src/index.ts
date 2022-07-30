import { SERVER_PORT } from "./config"
import express, { Express } from "express"
import { resumeRoutes } from "./routes/resume"
import { errorHandler } from "./error/handlers"

const app: Express = express()

app.use("/resume", resumeRoutes)
app.use(errorHandler)

app.listen(SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${SERVER_PORT}`)
})
