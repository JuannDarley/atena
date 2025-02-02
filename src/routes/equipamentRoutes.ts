import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function equipamentRoutes(app: FastifyInstance) {
	app.get('/equipaments', async () => {
		const equipaments = await prisma.equipament.findMany({
			orderBy: {
				createdAt: 'asc',
			},
		})

		return equipaments.map((equipaments) => {
			return {
				id: equipaments.id,
				series: equipaments.series,
				status: equipaments.status,
			}
		})
	})

	app.get('/equipaments/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const equipament = await prisma.equipament.findUniqueOrThrow({
			where: {
				id,
			},
		})

		return equipament
	})

	app.post('/equipaments', async (request) => {
		const bodySchema = z.object({
			series: z.string(),
			model: z.string().toUpperCase(),
			mark: z.string().toUpperCase(),
			status: z.number().int().nullable(),
		})

		const { series, model, mark, status } = bodySchema.parse(request.body)

		const equipament = await prisma.equipament.create({
			data: {
				series,
				model,
				mark,
				status,
			},
		})

		return equipament
	})

	app.put('/equipaments/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const bodySchema = z.object({
			series: z.string(),
			model: z.string().toUpperCase(),
			mark: z.string().toUpperCase(),
			status: z.number().int().nullable(),
		})

		const { series, model, mark, status } = bodySchema.parse(request.body)

		const equipament = await prisma.equipament.update({
			where: {
				id,
			},
			data: {
				series,
				model,
				mark,
				status,
			},
		})

		return equipament
	})

	app.delete('/equipaments/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		await prisma.equipament.delete({
			where: {
				id,
			},
		})
	})
}
