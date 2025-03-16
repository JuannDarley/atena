import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteUser } from '../functions/crudUser/delete-user'
import { getAllUsers } from '../functions/crudUser/get-all-users'
import { getUser } from '../functions/crudUser/get-user'
import { registerToUser } from '../functions/crudUser/register-to-users'
import { updateToUser } from '../functions/crudUser/update-to-user'

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
	app.get(
		'/user/:id',
		{
			schema: {
				description: 'Get a user by id',
				tags: ['Users'],
				summary: 'Get user by id',
				params: z.object({
					id: z.string(),
				}),

				response: {
					200: z.object({
						id: z.string(),
						name: z.string(),
						senha: z.string(),
						login: z.string(),
						email: z.string(),
						position: z.string(),
					}),
				},
			},
		},

		async (request, reply) => {
			const { id } = request.params

			const { name, login, senha, email, position } = await getUser({ id })

			return reply.status(200).send({
				id,
				name,
				login,
				senha,
				email,
				position,
			})
		},
	)
	app.post(
		'/register',
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
	app.put(
		'/updateuser/:id',
		{
			schema: {
				summary: 'Update a user exists',
				tags: ['Users'],
				params: z.object({
					id: z.string(),
				}),
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
						position: z.string().toUpperCase(),
					}),
				},
			},
		},
		async (request) => {
			const { id } = request.params

			const { name, login, senha, email, position } = request.body

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
		'/deleteuser/:id',
		{
			schema: {
				summary: 'Delete user by id',
				tags: ['Users'],
				response: {
					200: z.object({
						Ok: z.string(),
					}),
				},
			},
		},
		async (request) => {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = paramsSchema.parse(request.params)

			await deleteUser({ id })

			return { Ok: 'deletado' }
		},
	)
}
