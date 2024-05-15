import type { Metadata } from 'next'
import { RegisterForm } from './RegisterForm'

export const metadata: Metadata = {
	title: 'Register',
}

export default function RegisterPage() {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className=' p-8 rounded-lg shadow-md'>
				<h2 className='font-semibold mb-4'>Регистрация</h2>
				<RegisterForm />
			</div>
		</div>
	)
}
