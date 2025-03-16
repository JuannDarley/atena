import bcrypt from 'bcrypt'
import { prisma } from '../../lib/prisma'

interface RegisterToUserParams {
	name: string
	login: string
	senha: string
	email: string
	position: string
}

export async function registerToUser({
	name,
	login,
	senha,
	email,
	position,
}: RegisterToUserParams) {
	const hashPassword = await bcrypt.hash(senha, 10)

	const user = await prisma.user.create({
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
