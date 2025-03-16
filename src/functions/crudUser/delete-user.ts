import { prisma } from '../../lib/prisma'

interface DeleteUserParams {
	id: string
}

export async function deleteUser({ id }: DeleteUserParams) {
	await prisma.user.delete({
		where: {
			id,
		},
	})

	return
}
