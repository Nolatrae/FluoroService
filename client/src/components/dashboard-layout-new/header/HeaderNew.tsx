import FullScreen from './components/FullScreen'
import HeaderProfile from './components/HeaderProfile'
import Notifications from './components/Notifications'
import Search from './components/Search'

export default function HeaderNew() {
	return (
		<div className='py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30'>
			{/* <button
				type='button'
				className='text-lg text-gray-900 font-semibold sidebar-toggle'
			>
				<i className='ri-menu-line'></i>
			</button> */}

			<ul className='ml-auto flex items-center'>
				<Search />
				<Notifications />
				<FullScreen />
				<HeaderProfile />
			</ul>
		</div>
	)
}
