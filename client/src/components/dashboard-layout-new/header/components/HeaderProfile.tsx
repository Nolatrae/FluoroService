export default function HeaderProfile() {
	return (
		<li className='dropdown ml-3'>
			<button type='button' className='dropdown-toggle flex items-center'>
				<div className='flex-shrink-0 w-10 h-10 relative'>
					<div className='p-1 bg-white rounded-full focus:outline-none focus:ring'>
						<img
							className='w-8 h-8 rounded-full'
							src='https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg'
							alt=''
						/>
						<div className='top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping'></div>
						<div className='top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full'></div>
					</div>
				</div>
				<div className='p-2 md:block text-left'>
					<h2 className='text-sm font-semibold text-gray-800'>John Doe</h2>
					<p className='text-xs text-gray-500'>Administrator</p>
				</div>
			</button>
			<ul className='dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]'>
				<li>
					<a
						href='#'
						className='flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50'
					>
						Profile
					</a>
				</li>
				<li>
					<a
						href='#'
						className='flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50'
					>
						Settings
					</a>
				</li>
				{/* <li>
				<form method='POST' action=''>
					<a
						role='menuitem'
						className='flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer'
						// onclick="event.preventDefault();
						// 								this.closest('form').submit();"
					>
						Log Out
					</a>
				</form>
			</li> */}
			</ul>
		</li>
	)
}
