// dotenv
import dotenv from 'dotenv'
dotenv.config()

// express
import express from 'express'

// express async error
// import 'express-async-errors'

const app = express()

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

// db  and authenticateUser
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

const port = process.env.PORT || 8000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.DB_CONNECTION_STRING)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()