import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import connectDB from './mongodb/connect.js'
import { dotenvConfig } from './utils/index.js'

const __filename = fileURLToPath(import.meta.url)
dotenvConfig(__filename, '/../.env') //env file config

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', (req, res) => {
  res.send('Hello from DALL-E!')
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL)
  } catch (error) {
    console.log(error)
  }

  app.listen(8000, () => console.log('Server has started on port http://localhost:8000'))
}

startServer()