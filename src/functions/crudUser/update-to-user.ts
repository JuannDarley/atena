import bcrypt from 'bcrypt'
import { prisma } from '../../lib/prisma'

interface UpdateToUserParams {
	id: string
	name: string
	login: string
	senha: string
	email: string
	position: string
}

export async function updateToUser({
	id,
	name,
	login,
	senha,
	email,
	position,
}: UpdateToUserParams) {
	const hashPassword = await bcrypt.hash(senha, 10)

	const user = await prisma.user.update({
		where: {
			id,
		},
		data: {
			name,
			login,
			senha: hashPassword,
			email,
			position,
		},
	})

	return user
}
