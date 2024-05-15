import { getServerTokens } from '@/utils/server/get-server-auth'

export async function getTokens() {
	const tokens = await getServerTokens()
	return tokens
}
