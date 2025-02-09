import 'fastify'

declare module 'fastify' {
	interface FastifyRequest {
		userId?: string // ou number, dependendo da sua aplicação
	}
}
