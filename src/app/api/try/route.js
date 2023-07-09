import { getServerSession } from "next-auth/next"
import authOptions from '@/options/next-auth'

export async function GET(request) {
  const session = await getServerSession(authOptions)

  return session
}
