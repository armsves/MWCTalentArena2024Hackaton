import { sql } from '@vercel/postgres';
//import { timeAgo } from '@/lib/utils'
import Image from 'next/image';
import RefreshButton from './refresh-button';
import { seed } from '@/lib/seed';

let patients,
	physician: any = [];
let medicalCenter: any = [];

let isLogged = true;

export default async function Table() {
	let data, dataCenter, dataPhysician;
	let showdata = false;
	const email: string = 'stey@vercel.com';
	const doctorId = 1;

	try {
		data = await sql`SELECT * FROM patients WHERE email = ${email}`;
		patients = data.rows;
		if (patients.length > 0) {
			dataPhysician =
				await sql`SELECT * FROM physicians WHERE id = ${doctorId}`;
			physician = dataPhysician.rows;
			dataCenter =
				await sql`SELECT * FROM medical_center WHERE id = ${physician[0].id_center}`;
			medicalCenter = dataCenter.rows;

			const url = 'https://location-verification.p-eu.rapidapi.com/verify';
			const headers = {
				'content-type': 'application/json',
				'X-RapidAPI-Key': '57f72d34a8msh0ddd05839e901ccp115120jsn4cec2eada6b1',
				'X-RapidAPI-Host': 'location-verification.nokia.rapidapi.com'
			};
			const data = {
				device: { phoneNumber: patients[0].phone_number },
				area: {
					areaType: 'Circle',
					center: {
						latitude: medicalCenter[0].latitude,
						longitude: medicalCenter[0].longitude
					},
					radius: 1000
				},
				maxAge: 60
			};

			const response = await fetch(url, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(data)
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const responseData = await response.json();
			if (responseData.verificationResult === 'TRUE') {
				showdata = true;
			}
		}
	} catch (e: any) {
		throw e;
	}

	return (
		<div className='bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full'>
			<div className='flex justify-between items-center mb-4'>
				<div className='space-y-1'>
					<h2 className='text-xl font-semibold'>
						Hospital: {patients.length > 0 && medicalCenter[0].name}
					</h2>
					<p className='text-sm text-gray-500'>Patient Data</p>
				</div>
			</div>
			{isLogged && (
				<div className='flex items-center justify-between py-3'>
					<div>
						<h3>Phycisian</h3>
					</div>
					<p>{physician[0].name}</p>
				</div>
			)}

			<div className=''>
				{showdata ? (
					<div className='flex items-center justify-between py-3'>
						<div>
							<h3>Patient is in your area</h3>
						</div>
						<p>{patients[0].name}</p>
						<p>{patients[0].email}</p>
						<p>{patients[0].id_center}</p>
					</div>
				) : (
					<div className='flex items-center justify-between py-3'>
						<div>
							<h3>Patient is not in your area</h3>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
