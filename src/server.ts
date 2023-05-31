import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads/',
})

app.register(jwt, {
  secret: 'spacetime',
})
// HTTP METHOD : GET, POST, PUT, PATHC, DELETE, HEAD
app.register(cors, {
  origin: true, // todas URLS de front-end poderão acessar o back-end
  // origin: ['http://localhost:3000', 'http://site.com.br/'],
})
app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('😎 HTTP server running on http://localhost:3333')
  })
