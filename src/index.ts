import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import cros from 'cors'
import morgan from 'morgan'
import router from './routes'
import configs from './configs'
import pool from './database'

const app: Application = express()
const port: number = parseInt(configs.PORT as string) || parseInt(process.env.PORT as string)


app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cros())

app.get('/', (_req: Request, res: Response): void => {
    res.json({
        success: true,
        message: 'Hello there!'
    })
})

app.use("/api", router)

app.use((_req: Request, res: Response): void => {
    res.status(404).json({
        success: false,
        message: 'Oops! Not found page!'
    })
})

const connectDB = async () => {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT NOW()')
        console.info(res.rows)
    } catch (err) {
        console.error(err)
    } finally {
        client.release()
    }
}
connectDB()

app.listen(port, () => console.info(`Server is running on: http://localhost:${port}`))

export default app
