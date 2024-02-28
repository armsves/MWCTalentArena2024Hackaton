'use client';

import '@/css/login.css';
import { login } from '@/lib/data';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function Login() {
	const router = useRouter();
	const cookies = useCookies();

	const [tabs, setTabs] = useState([
		{
			title: 'doctor',
			selected: true
		},
		{
			title: 'patient',
			selected: false
		}
	]);
	const [loading, setLoading] = useState(false);

	const handleTabChange = (title) => {
		// Update the tabs state based on the selected title
		const updatedTabs = tabs.map((tab) => ({
			...tab,
			selected: tab.title === title
		}));

		setTabs(updatedTabs);
	};

	const getSelectedTabTitle = () => {
		const selectedTab = tabs.find((tab) => tab.selected);
		return selectedTab ? selectedTab.title : null;
	};

	const handleLogin = (e) => {
		e.preventDefault();

		const role = e.target.dataset.role;
		const email = e.target.email.value;
		const password = e.target.password.value;

		setLoading(true);

		try {
			login(cookies, role, email, password);
			router.push('/');
			router.refresh();
		} catch (e) {
			// handle exceptions
		}
	};

	return (
		<>
			<h1>Log In as a</h1>
			<div className='login'>
				<div className='login-tabs'>
					{tabs.map((tab) => {
						return (
							<button
								key={tab.title}
								className='btn btn--tab'
								data-selected={tab.selected}
								onClick={() => handleTabChange(tab.title)}
							>
								{tab.title}
							</button>
						);
					})}
				</div>
				<form
					onSubmit={handleLogin}
					data-role={getSelectedTabTitle()}
					className='login-form'
				>
					<input
						type='email'
						name='email'
						id='email'
						placeholder={`${getSelectedTabTitle()}@mymail.com`}
					/>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='********'
						required
					/>
					<button disabled={loading} className='btn btn-login' type='submit'>
						{loading ? 'Loading...' : 'Log In'}
					</button>
				</form>
			</div>
		</>
	);
}
