'use client';

import { useCookies } from 'next-client-cookies';

import { getSession } from '@/lib/data';
import { useRouter } from 'next/navigation';

import DoctorView from '@/components/doctor-view';
import PatientView from '@/components/patient-view';

export default function Home() {
	const router = useRouter();
	const cookies = useCookies();

	const session = getSession(cookies);

	if (!session) {
		router.push('/login');
		return;
	}

	return <>{session.role === 'doctor' ? <DoctorView /> : <PatientView />}</>;
}
