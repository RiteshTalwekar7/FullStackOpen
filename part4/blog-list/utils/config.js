import { configDotenv } from 'dotenv'
configDotenv()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

export default {
  PORT,
  MONGODB_URL
}