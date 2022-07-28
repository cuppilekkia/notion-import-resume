import dotenv from "dotenv"
dotenv.config()

const SERVER_PORT = process.env.PORT || 8080
const RESUME_PAGE_ID = process.env.RESUME_PAGE_ID || ""

export {
    SERVER_PORT,
    RESUME_PAGE_ID,
}