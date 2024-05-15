import { Metadata } from 'next'
import SendForm from './send-form/SendForm'

export const metadata: Metadata = {
	title: 'Send fluoro',
}

export default function SendPage() {
	return (
		<>
			<SendForm />
		</>
	)
}
