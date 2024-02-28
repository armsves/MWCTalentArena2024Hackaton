'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
	createConnectionSession,
	getPatient,
	savePatientInSession
} from '@/lib/data';
import { useCookies } from 'next-client-cookies';

export default function Connection() {
	const cookies = useCookies();
	const [patient, setPatient] = useState(null);
	const [connection, setConnection] = useState({
		status: null,
		loading: true
	});

	const router = useRouter();
	const params = useSearchParams();

	const patientEmail = params.get('email');

	useEffect(() => {
		async function handleConnection() {
			try {
				// search for patient by email
				const fetchedPatient = await getPatient(patientEmail);
				setPatient(fetchedPatient.patients[0]);
				// create network connection
				setConnection({ ...connection, status: 'ok' });
				createConnectionSession(cookies);
				// save patient locally for future use
				savePatientInSession(cookies, fetchedPatient.patients[0]);
			} catch (error) {
				console.error({ error });
			}

			setTimeout(() => {
				router.push('/');
			}, 1000);
		}

		handleConnection();
	}, []);

	return (
		<main>
			<div className='connection-loading'>
				<p>Trying to establish a connection with patient...</p>
				{patient && <p>Established connection with patient {patient.name}</p>}
				{connection.status === 'ok' && (
					<p>Established connection successfuly, redirecting to homepage.</p>
				)}
			</div>
		</main>
	);
}
