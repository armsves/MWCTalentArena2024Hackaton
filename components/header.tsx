'use client';

import '@/css/header.css';

import { getSession, logout } from '@/lib/data';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

export default function Header() {
	const router = useRouter();
	const cookies = useCookies();

	const session = getSession(cookies);

	const handleLogout = () => {
		logout(cookies);
		router.push('/login');
		router.refresh();
	};

	return (
		<header>
			<div className='logo'>[LOGO]</div>

			{session && (
				<button onClick={handleLogout} className='btn btn-logout'>
					Log out
				</button>
			)}
		</header>
	);
}
