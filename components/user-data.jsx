import '@/css/user-data.css';

import { getPatientFromSession } from '@/lib/data';
import { useCookies } from 'next-client-cookies';
import { useState } from 'react';

export default function UserData() {
	// const user = getPatient();
	const [history, setHistory] = useState([
		{
			history_event:
				'Medical History: No significant medical history. Generally healthy.'
		},
		{
			history_event:
				'Current Complaint: Experiencing occasional headaches and fatigue.'
		}
	]);

	const cookies = useCookies();

	const user = getPatientFromSession(cookies);

	const center = {
		name: 'Medical Center 1',
		address: 'Carrer del Joncs 1. Barcelona'
	};

	console.log({ user });

	return (
		<div className='user-data'>
			<div className='user-data-header'>
				<h2>Patient details</h2>
				<img
					src='https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg'
					alt=''
				/>
			</div>
			<div className='field data-field'>
				<h3 className='field-title'>Name</h3>
				<p>{user.name}</p>
			</div>
			<div className='field data-field'>
				<h3 className='field-title'>Email</h3>
				<p>{user.email}</p>
			</div>
			<div className='field data-field'>
				<h3 className='field-title'>Phone Number</h3>
				<p>{user.phone_number}</p>
			</div>
			<div className='field data-field'>
				<h3 className='field-title'>Center</h3>
				<p>{center.name}</p>
				<p>{center.address}</p>
			</div>
			<div className='field data-field'>
				<h3 className='field-title'>
					History <button className='history-edit'>e</button>
				</h3>
				{history.map((h) => {
					const hParts = h.history_event.split(':');
					const historyTitle = hParts[0];
					const historyText = hParts[1];
					return (
						<p key={h[0]}>
							<span className='history-title'>{historyTitle}</span>:
							<span className='history-text'>{historyText}</span>
						</p>
					);
				})}
			</div>
		</div>
	);
}
