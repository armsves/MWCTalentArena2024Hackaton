'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
	createConnection,
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
			// search for patient by email
			try {
				const fetchedPatient = await getPatient(patientEmail);
				setPatient(fetchedPatient.patients[0]);
				setConnection({ ...connection, status: 'ok' });
				createConnectionSession(cookies);
				savePatientInSession(cookies, fetchedPatient.patients[0]);
			} catch (error) {
				console.error({ error });
				// alert('We could not find patient, redirecting to homepage.');
			}

			setTimeout(() => {
				router.push('/');
			}, 1000);
			// if (fetchedPatient) {
			// 	setPatient(fetchedPatient);

			// 	console.log(fetchedPatient);
			// 	console.log(patient);

			// 	setTimeout(() => {
			// 		const createdConnection = createConnection(fetchedPatient.phone);

			// 		createConnection.loading = false;

			// 		if (createdConnection) {
			// 			setConnection(createdConnection);
			// 			createConnectionSession(cookies);
			// 			setTimeout(() => {
			// 				router.push('/');
			// 			}, 1000);
			// 		}
			// 	}, 2000);
			// }

			// handle connection
			// if connection is successful
			// update status accordingly + loading to false
			// else
			// same
			// redirect to homepage
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
