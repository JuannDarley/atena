import fastify from 'fastify'
import { equipamentRoutes } from './routes/equipamentRoutes'
import { usersRoutes } from './routes/userRoutes'

export const app = fastify()

app.register(equipamentRoutes)
app.register(usersRoutes)
