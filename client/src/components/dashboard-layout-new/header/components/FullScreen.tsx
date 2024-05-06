'use client'
import { useEffect } from 'react'

export default function FullScreen() {
	useEffect(() => {
		const fullscreenButton = document.getElementById('fullscreen-button')

		if (fullscreenButton) {
			fullscreenButton.addEventListener('click', toggleFullscreen)
		}

		return () => {
			if (fullscreenButton) {
				fullscreenButton.removeEventListener('click', toggleFullscreen)
			}
		}
	}, [])

	function toggleFullscreen() {
		if (document.fullscreenElement) {
			// If already in fullscreen, exit fullscreen
			document.exitFullscreen()
		} else {
			// If not in fullscreen, request fullscreen
			document.documentElement.requestFullscreen()
		}
	}

	return (
		<button id='fullscreen-button'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				className='hover:bg-gray-100 rounded-full'
				viewBox='0 0 24 24'
				style={{ fill: 'gray', transform: 'msFilter' }}
			>
				<path d='M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z'></path>
			</svg>
		</button>
	)
}
