import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'

const app = express()

app.use(compression())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const path = '/api/v1/user'
app.use(`${path}`, require('./routes'))
app.use(`${path}/delete/:id`, require('./routes'))
app.use(`${path}/edit/:id`, require('./routes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
