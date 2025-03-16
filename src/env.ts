import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string().default(''),
	SECRET_KEYS_ONE: z.string().default('teste'),
	SECRET_KEYS_TWO: z.string().default('testetwo'),
})
export const env = envSchema.parse(process.env)
