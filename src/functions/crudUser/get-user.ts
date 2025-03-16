import { prisma } from '../../lib/prisma'

interface GetUserParams {
	id: string
}

export async function getUser({ id }: GetUserParams) {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			id,
		},
	})

	return user
}
