import fastify from 'fastify'
import { equipamentRoutes } from './routes/equipamentRoutes'
import { loginRoutes } from './routes/loginRoute'
import { preventiveRoutes } from './routes/preventiveRoutes'
import { usersRoutes } from './routes/userRoutes'

export const app = fastify()

app.register(equipamentRoutes)
app.register(usersRoutes)
app.register(preventiveRoutes)
app.register(loginRoutes)
