import { sql } from '@vercel/postgres';
import Link from 'next/link';

let patients: any = [];
let medicalCenters: any = [];

export default async function Geofencing() {
	let data, dataCenter;
	let showdata = false;

	const url = 'https://location-verification.p-eu.rapidapi.com/verify';
	const headers = {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '57f72d34a8msh0ddd05839e901ccp115120jsn4cec2eada6b1',
		'X-RapidAPI-Host': 'location-verification.nokia.rapidapi.com'
	};
	const url2 = 'https://location-retrieval.p-eu.rapidapi.com/retrieve';
	const headers2 = {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '57f72d34a8msh0ddd05839e901ccp115120jsn4cec2eada6b1',
		'X-RapidAPI-Host': 'location-retrieval.nokia.rapidapi.com'
	};

	try {
		data = await sql`SELECT * FROM patients`;
		patients = data.rows;
		if (patients.length > 0) {
			dataCenter = await sql`SELECT * FROM medical_center`;
			medicalCenters = dataCenter.rows;
		}
	} catch (e: any) {
		throw e;
	}

	return (
		<>
			<Link href='/' className='btn btn--back'>
				Go back to homepage
			</Link>
			<table className='bg-white/30 shadow-xl ring-1 ring-gray-900/5  backdrop-blur-lg p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg max-w-screen-xl mx-auto mt-8 w-full whitespace-nowrap overflow-auto max-w-full'>
				<tr>
					<th className='text-xl font-semibold'>Name</th>
					<th className='text-xl font-semibold'>Phone Number</th>
					<th className='text-xl font-semibold'>Latitude</th>
					<th className='text-xl font-semibold'>Longitude</th>
					<th className='text-xl font-semibold'>{medicalCenters[0].name}</th>
					<th className='text-xl font-semibold'>{medicalCenters[1].name}</th>
					<th className='text-xl font-semibold'>{medicalCenters[2].name}</th>
				</tr>
				{patients &&
					patients.map(async (patient: any) => {
						const data2 = {
							device: { phoneNumber: patient.phone_number },
							maxAge: 60
						};
						const response2 = await fetch(url2, {
							method: 'POST',
							headers: headers2,
							body: JSON.stringify(data2)
						});
						const responseData2 = await response2.json();

						return (
							<tr key={patient.name}>
								<td>{patient.name}</td>
								<td>{patient.phone_number}</td>
								<td>{responseData2.area.center.latitude}</td>
								<td>{responseData2.area.center.longitude}</td>

								{medicalCenters &&
									medicalCenters.map(async (medicalCenter: any) => {
										const data = {
											device: { phoneNumber: patient.phone_number },
											area: {
												areaType: 'Circle',
												center: {
													latitude: medicalCenter.latitude,
													longitude: medicalCenter.longitude
												},
												radius: 200
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
										return (
											<>
												<td
													className={
														showdata ? 'text-green-500' : 'text-red-500'
													}
												>
													{showdata
														? 'Patient is in your area'
														: 'Patient is NOT in your area'}
												</td>
											</>
										);
									})}
							</tr>
						);
					})}
			</table>
		</>
	);
}
