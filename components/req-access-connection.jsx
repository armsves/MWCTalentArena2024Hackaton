import { useRouter } from 'next/navigation';

export default function ReqPatientConnection() {
	const router = useRouter();

	function handleForm(e) {
		e.preventDefault();

		const patientEmail = e.target.elements.email.value;

		router.push(`/connection?email=${patientEmail}`);
	}

	return (
		<form onSubmit={handleForm} className='req-access-connection'>
			<h2>Enter patient&apos;s email</h2>
			<input
				autoComplete='off'
				type='email'
				name='email'
				id='email'
				placeholder='Email address'
				required
			/>
			<button type='submit' className='btn btn-req-access'>
				REQUEST ACCESS
			</button>
		</form>
	);
}
