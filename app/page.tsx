'use client';

import { useCookies } from 'next-client-cookies';

import { getSession } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const cookies = useCookies();

	const session = getSession(cookies);

	if (!session) {
		router.push('/login');
		return;
	}

	return (
		<h1>test</h1>
		// <main className='relative flex min-h-screen flex-col items-center justify-center'>
		// 	<h1 className='pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl'>
		// 		Worldwide Patient Records
		// 	</h1>
		// 	<Suspense fallback={<TablePlaceholder />}>
		// 		<Table />
		// 	</Suspense>
		// 	<p className='font-light text-gray-600 w-full max-w-lg text-center mt-6'></p>

		// 	<div className='flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-xl text-gray-600'></div>

		// 	<div className='sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between'></div>
		// </main>
	);
}
