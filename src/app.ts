import fastify from 'fastify'
import { equipamentRoutes } from './routes/equipamentRoutes'
import { usersRoutes } from './routes/userRoutes'
import { preventiveRoutes } from './routes/preventiveRoutes'

export const app = fastify()

app.register(equipamentRoutes)
app.register(usersRoutes)
app.register(preventiveRoutes)
