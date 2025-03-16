import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { usersRoutes } from './routes/users-routes'

export const app = fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
	origin: '*',
})

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'API for preventive measures and equipment registration',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: '/documentation',
	uiConfig: {
		docExpansion: 'full',
		deepLinking: false,
	},
})

app.register(usersRoutes)
/*app.register(equipamentRoutes)

app.register(preventiveRoutes)
app.register(loginRoutes)*/
