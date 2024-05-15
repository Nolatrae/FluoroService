'use client'
import { useState } from 'react'

export const UploadFile = () => {
	const [selectedFile, setSelectedFile] = useState(null)
	const [uploaded, setUploaded] = useState()

	const handleChange = event => {
		setSelectedFile(event.target.files[0])
	}

	const handleUpload = async () => {
		if (!selectedFile) {
			alert('Please select a file')
			return
		}

		const formData = new FormData()
		formData.append('file', selectedFile)

		const res = fetch('http://localhost:4200/api/fluorography/send', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnFrY3R2ODAwMDBvc3BlZWQwNnp2cHYiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTUyNjAzNjYsImV4cCI6MTcxNTI2Mzk2Nn0.7sXjPZleXWzpFq7NhmRwnwpA-9oZ6KbRnjEzh43YX8o',
				refreshToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnFrY3R2ODAwMDBvc3BlZWQwNnp2cHYiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTUyNjAzNjYsImV4cCI6MTcxNTg2NTE2Nn0.5e_YWxIh7JrkNHK9o92UTUMpuigYLrOvyGwMpVAGxU0',
				accessToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnFrY3R2ODAwMDBvc3BlZWQwNnp2cHYiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTUyNjAzNjYsImV4cCI6MTcxNTI2Mzk2Nn0.7sXjPZleXWzpFq7NhmRwnwpA-9oZ6KbRnjEzh43YX8o',
			},
		})
		const data = await res.json()

		setUploaded(data)
	}

	return (
		<>
			<input type='file' onChange={handleChange} />

			<button className='shadow-md p-4' onClick={handleUpload}>
				Upload now!
			</button>

			{/* {selectedFile && (
				<ul className='mt-6'>
					<li>Name: {selectedFile.name}</li>
					<li>Type: {selectedFile.type}</li>
					<li>Size: {selectedFile.size}</li>
					<li></li>
				</ul>
			)} */}

			{/* {uploaded && (
				<div>
					<h2>{uploaded.filename}</h2>
					<img alt='' src={uploaded.filepath} width='200'></img>
				</div>
			)} */}
		</>
	)
}
