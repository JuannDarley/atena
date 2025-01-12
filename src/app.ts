import fastify from 'fastify'
import { equipamentRoutes } from './routes/equipamentRoutes'

export const app = fastify()

app.register(equipamentRoutes)
