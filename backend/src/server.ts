import express from 'express'
import './database/connection'
import cors from 'cors'

import 'express-async-errors'
import path from 'path'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

const port = 3333;

app.listen(port, () => console.log(`Happy backend is starting on port: ${port}`));


