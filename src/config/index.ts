import dotenv from "dotenv"
dotenv.config()

const SERVER_PORT = process.env.PORT || 8080
const RESUME_PAGE_ID = process.env.RESUME_PAGE_ID || ""
const NOTION_KEY = process.env.NOTION_KEY

if (!NOTION_KEY) {
    throw new Error("NOTION_KEY must be set")
}
if (!RESUME_PAGE_ID) {
    throw new Error("RESUME_PAGE_ID must be set")
}

export {
    SERVER_PORT,
    RESUME_PAGE_ID,
    NOTION_KEY
}