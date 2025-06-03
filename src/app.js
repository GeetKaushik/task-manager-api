import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import taskRoutes from './routes/task.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: 'https://task-manager-emeodukkn-geetkaushiks-projects.vercel.app',
    credentials: true,
  })
)

// Registering routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send('Task Manager API is running...')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
