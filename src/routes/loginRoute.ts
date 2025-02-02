import type { FastifyInstance } from 'fastify'
//import { z } from 'zod'
//import { prisma } from '../lib/prisma'
export async function loginRoutes(app: FastifyInstance) {
	app.post('/login', async () => {
		//const users = await prisma.user.findMany()
	})
}
