import Table from "@/components/ui/table/Table";
import { API_URL } from "@/constants";
import { EnumTokens } from "@/services/auth.service";
import { IUser } from "@/types/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: 'list users',
}

const fetchUser = async () => {
	'use server'

	const cookie = cookies()
	const accessToken = cookie.get(EnumTokens.ACCESS_TOKEN)?.value

	return fetch(`${API_URL}/auth/users`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then(res => res.json()) as Promise<IUser[]>
}

export default async function Page() {

    const users = await fetchUser()

    return(
        <>
        <Table data={users} />
        </>
    )
}