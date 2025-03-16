import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getAllUsers } from '../functions/crudUser/get-all-users'
import { registerToUser } from '../functions/crudUser/register-to-users'

export const usersRoutes: FastifyPluginAsyncZod = async (app) => {
	app.get(
		'/users',
		{
			schema: {
				summary: 'Get all users',
				tags: ['Users'],
				response: {
					200: z.object({
						users: z.array(
							z.object({
								id: z.string(),
								name: z.string(),
								position: z.string(),
							}),
						),
					}),
				},
			},
			//preHandler: [AuthMiddlewaresAdm],
		},

		async () => {
			const users = await getAllUsers()

			const allUser = users.map((users) => {
				return {
					id: users.id,
					name: users.name,
					position: users.position,
				}
			})

			return { users: allUser }
		},
	)

	/*app.get(
		'/users/:id',
		{
			//preHandler: [AuthMiddlewaresAdm],
		},
		async (request) => {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = paramsSchema.parse(request.params)

			const user = await getUser({ id })
			return user
		},
	)*/

	app.post(
		'/users',
		{
			schema: {
				summary: 'Register a new user',
				tags: ['Users'],
				body: z.object({
					name: z.string(),
					login: z.string(),
					senha: z.string(),
					email: z.string(),
					position: z.string().toUpperCase(),
				}),
				reponse: {
					201: z.object({
						id: z.string(),
						name: z.string(),
						login: z.string(),
						email: z.string(),
						position: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, login, senha, email, position } = request.body

			const user = await registerToUser({
				name,
				login,
				senha,
				email,
				position,
			})

			return reply.status(201).send({
				id: user.id,
				name: user.name,
				login: user.login,
				email: user.email,
				position: user.position,
			})
		},
	)
	/*app.put(
		'/users/:id',
		{
			preHandler: [AuthMiddlewaresAdm],
		},
		async (request) => {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = paramsSchema.parse(request.params)

			const bodySchema = z.object({
				name: z.string(),
				login: z.string(),
				senha: z.string(),
				email: z.string(),
				position: z.string().toUpperCase(),
			})

			const { name, login, senha, email, position } = bodySchema.parse(
				request.body,
			)

			const user = await updateToUser({
				id,
				name,
				login,
				senha,
				email,
				position,
			})

			return {
				id: user.id,
				name: user.name,
				login: user.login,
				email: user.email,
				position: user.position,
			}
		},
	)
	app.delete(
		'/users/:id',
		{
			preHandler: [AuthMiddlewaresAdm],
		},
		async (request) => {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = paramsSchema.parse(request.params)

			const userDeleted = await deleteUser({ id })

			return userDeleted
		},
	)*/
}
