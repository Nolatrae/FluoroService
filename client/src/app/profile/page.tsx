// const fetchProfile = async () => {
// 	'use server'

import { Metadata } from 'next'

// 	const cookie = cookies()
// 	const accessToken = cookie.get(EnumTokens.ACCESS_TOKEN)?.value

// 	return fetch(`${API_URL}/auth/profile`, {
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`,
// 		},
// 	}).then(res => res.json()) as Promise<IUser>
// }

export const metadata: Metadata = {
	title: 'Profile',
}

export default async function ProfilePage() {
	// const profile = await fetchProfile()

	return (
		// <div>
		// 	{profile ? (
		// 		<>
		// 			<h1>Profile</h1>
		// 			<p>{profile.email}</p>
		// 		</>
		// 	) : (
		<p>Not found!</p>
		// 	)}
		// </div>
	)
}
