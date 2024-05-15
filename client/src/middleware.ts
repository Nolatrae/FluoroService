import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_PAGES } from './config/pages/admin.config'
import { PUBLIC_PAGES } from './config/pages/public.config'
import authService, { EnumTokens } from './services/auth.service'
import { ITokenInside, UserRole } from './services/auth.types'

export async function middleware(request: NextRequest, response: NextResponse) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const isAdminPage =
		request.url.includes(ADMIN_PAGES.HOME) ||
		request.url.includes(ADMIN_PAGES.LIST)

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

		if (request.url === '/') {
			return NextResponse.redirect(new URL('/profile', request.url))
		}

		// Проверка ролей пользователей для доступа к ADMIN_PAGES.LIST
		if (
			request.url.includes(ADMIN_PAGES.LIST) &&
			(payload?.role === UserRole.Curator || payload?.role === UserRole.Admin)
		) {
			return NextResponse.next()
		}

		// Проверка роли администратора для доступа к ADMIN_PAGES.HOME
		if (
			request.url.includes(ADMIN_PAGES.HOME) &&
			payload?.role === UserRole.Admin
		) {
			return NextResponse.next()
		}

		if (isAdminPage) {
			return NextResponse.redirect(new URL('/404', request.url))
		}

		return NextResponse.next()
	} catch (error) {
		// Обработка ошибок верификации JWT
	}
}

export const config = {
	matcher: ['/admin/:path*', '/profile/:path*', '/userlist'],
}

const redirectToLogin = (isAdminPage: boolean, request: NextRequest) => {
	return NextResponse.redirect(
		new URL(isAdminPage ? '/404' : PUBLIC_PAGES.LOGIN, request.url)
	)
}
