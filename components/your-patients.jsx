import '@/css/your-patients.css';

import { useEffect, useState } from 'react';

const initialData = [
	{
		id: 1,
		name: 'Steven Tey',
		email: 'stey@vercel.com',
		image:
			'https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg',
		password: '$2a$10$e2ZNjLc6msatoDtDXIMQzOhuFvw52oRJofj9JcZ4enDaZOs9lsvTC',
		id_center: 1,
		phone_number: '21431000013',
		status: true,
		eventSubscriptionId: null
	},
	{
		id: 2,
		name: 'John Doe',
		email: 'lee@vercel.com',
		image:
			'https://images.ctfassets.net/e5382hct74si/4BtM41PDNrx4z1ml643tdc/7aa88bdde8b5b7809174ea5b764c80fa/adWRdqQ6_400x400.jpg',
		password: '$2a$10$e2ZNjLc6msatoDtDXIMQzOhuFvw52oRJofj9JcZ4enDaZOs9lsvTC',
		id_center: 3,
		phone_number: '21431000011',
		status: true,
		eventSubscriptionId: 'e740e66b-891e-4573-b3b8-623789349360'
	},
	{
		id: 3,
		name: 'Jane Smith',
		email: 'rauchg@vercel.com',
		image:
			'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg',
		password: '$2a$10$e2ZNjLc6msatoDtDXIMQzOhuFvw52oRJofj9JcZ4enDaZOs9lsvTC',
		id_center: 2,
		phone_number: '21431000012',
		status: true,
		eventSubscriptionId: 'afef48ed-a008-47cd-9f56-629d71d3a830'
	}
];

export default function YourPatients() {
	const [patients, setPatients] = useState(initialData);

	useEffect(() => {}, []);

	return (
		<div className='your-patients'>
			<div className='your-patients-header'>
				<h2>Your patients</h2>
			</div>
			<div className='your-patients-data'>
				{patients.map((patient) => {
					return (
						<div key={patient.id} className='your-patient'>
							<div className='your-patient-image'>
								<img src={patient.image} alt='' />
							</div>
							<div className='your-patient-details'>
								<h3>
									<strong>Name: </strong>
									{patient.name}
								</h3>
								<p>
									<strong>Phone number: </strong>
									{patient.phone_number}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
