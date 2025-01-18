import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function preventiveRoutes(app: FastifyInstance) {
	app.get('/preventives', async () => {
		const preventives = await prisma.preventive.findMany({
			orderBy: {
				date: 'desc',
			},
		})

		return preventives.map((preventive) => {
			return {
				id: preventive.id,
				equipamentId: preventive.equipamentId,
				equipament_hours: preventive.equipament_hours,
				responsible: preventive.reponsible,
				date: preventive.date,
			}
		})
	})

	app.get('/preventives/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const preventives = await prisma.preventive.findUniqueOrThrow({
			where: {
				id,
			},
		})

		return preventives
	})

	app.post('/preventives', async (request) => {
		const bodySchema = z.object({
			equipament_hours: z.number(),
			preventive_HUB: z.coerce.boolean().default(false),
			type: z.string().toUpperCase(),
			status: z.string().toUpperCase(),
		})

		const { equipament_hours, preventive_HUB, type, status } = bodySchema.parse(
			request.body,
		)

		const preventives = await prisma.preventive.create({
			data: {
				equipament_hours,
				preventive_HUB,
				type,
				status,
				reponsible: 'JUAN DARLEY',
				equipamentId: '62d7f8fa-0925-4a58-883c-ada3b67b7730',
			},
		})

		return preventives
	})

	app.put('/preventives/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)
		const bodySchema = z.object({
			equipament_hours: z.number(),
			preventive_HUB: z.coerce.boolean().default(false),
			type: z.string().toUpperCase(),
			status: z.string().toUpperCase(),
		})

		const { equipament_hours, preventive_HUB, type, status } = bodySchema.parse(
			request.body,
		)

		const preventive = await prisma.preventive.update({
			where: {
				id,
			},
			data: {
				equipament_hours,
				preventive_HUB,
				type,
				status,
			},
		})

		return preventive
	})

	app.delete('/preventives/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		await prisma.preventive.delete({
			where: {
				id,
			},
		})
	})
}
