import { Client } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
const connectionString = `${process.env.DATABASE_URL}`
const pool = new Client({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default prisma;