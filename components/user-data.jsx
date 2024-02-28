import '@/css/user-data.css';

import { getPatientFromSession } from '@/lib/data';
import { useCookies } from 'next-client-cookies';
import { useState } from 'react';

import Pencil from '@/icons/Pencil';
import Close from '@/icons/Close';
import Trash from '@/icons/Trash';

export default function UserData() {
	// const user = getPatient();
	const [updating, setUpdating] = useState(false);
	const [history, setHistory] = useState([
		{
			id: 1,
			history_event:
				'Medical History: No significant medical history. Generally healthy.'
		},
		{
			id: 2,
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

	const handleUpdate = (e, id) => {
		const historyToUpdate = history.findIndex((h) => h.id === id);

		const history_event = e.target.value;

		let newHistory = [...history];

		newHistory[historyToUpdate]['history_event'] = history_event;

		setHistory(newHistory);
	};

	const handleAdd = () => {
		const lastId = history[history.length - 1].id;
		const newHistoryRecord = {
			id: lastId + 1,
			history_event: ''
		};
		setHistory([...history, newHistoryRecord]);
	};

	const handleRemove = (id) => {
		setHistory((h) => h.filter((item) => item.id !== id));
	};

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
					History{' '}
					<button
						onClick={() => setUpdating(!updating)}
						className='history-edit'
					>
						{updating ? <Close /> : <Pencil />}
					</button>
				</h3>
				{history.map((h) => {
					const hParts = h.history_event.split(':');
					const historyTitle = hParts[0];
					const historyText = hParts[1];

					return updating ? (
						<div className='history-input-wrapper'>
							<input
								key={h.id}
								type='text'
								onInput={(e) => handleUpdate(e, h.id)}
								value={h.history_event}
							/>
							<button
								onClick={() => handleRemove(h.id)}
								className='btn btn--remove'
							>
								<Trash />
							</button>
						</div>
					) : (
						h.history_event.length > 0 && (
							<p key={h.id}>
								<span className='history-title'>{historyTitle}</span>:
								<span className='history-text'>{historyText}</span>
							</p>
						)
					);
				})}
				{updating && (
					<button onClick={handleAdd} className='btn btn--add'>
						Add record
					</button>
				)}
			</div>
		</div>
	);
}
