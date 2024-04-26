import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_PAGES } from './config/pages/admin.config'
import { PUBLIC_PAGES } from './config/pages/public.config'
import authService, { EnumTokens } from './services/auth.service'
import { ITokenInside, UserRole } from './services/auth.types'

export async function middleware(request: NextRequest, response: NextResponse) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const isAdminPage = request.url.includes(ADMIN_PAGES.HOME)

	if (!refreshToken) {
		request.cookies.delete(EnumTokens.ACCESS_TOKEN)
		return redirectToLogin(isAdminPage, request)
	}

	if (!accessToken) {
		try {
			const data = await authService.getNewTokensByRefresh(refreshToken)
			accessToken = data.accessToken
		} catch (error) {
			request.cookies.delete(EnumTokens.ACCESS_TOKEN)
			return redirectToLogin(isAdminPage, request)
		}
	}

	try {
		const { payload }: { payload: ITokenInside } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)

		if (payload?.role === UserRole.Admin) return NextResponse.next()

		if (isAdminPage) {
			// console.log('Нет доступа к административной странице')
			return NextResponse.redirect(new URL('/404', request.url))
		}

		return NextResponse.next()
	} catch (error) {
		// Обработка ошибок, связанных с верификацией JWT
		if (
			error instanceof Error &&
			error.message.includes('exp claim timestamp check failed')
		) {
			// Токен истек
			console.log('Токен истек')
			return redirectToLogin(isAdminPage, request)
		}

		console.log('Ошибка при верификации токена: ', error)
		return redirectToLogin(isAdminPage, request)
	}
}

export const config = {
	matcher: ['/admin/:path*', '/profile/:path*'],
}

const redirectToLogin = (isAdminPage: boolean, request: NextRequest) => {
	return NextResponse.redirect(
		new URL(isAdminPage ? '/404' : PUBLIC_PAGES.LOGIN, request.url)
	)
}
