// Handling sessions with localStorage for testing purposes

export function login(cookies, role, email, password) {
	const sessionObject = {
		role,
		email,
		password
	};
	cookies.set('session', JSON.stringify(sessionObject)); // handle login
}

export function getSession(cookies) {
	const serializedSession = cookies.get('session');

	if (serializedSession) {
		const sessionObject = JSON.parse(serializedSession);
		return sessionObject;
	}

	return null; // or handle the case where there is no stored session
}

export function logout(cookies) {
	cookies.remove('session');
	cookies.remove('connection');
	cookies.remove('patient');
}

// Add connection to session (localStorage for testing purposes)
export function createConnectionSession(cookies) {
	cookies.set('connection', 'true');
}

// Get connection from session
export function getConnectionSession(cookies) {
	const connectionSession = cookies.get('connection');
	return connectionSession;
}

export async function getPatient(email) {
	const res = await fetch(
		`https://mwct-alent-arena2024-hack-git-48bea8-armandos-projects-2e09911a.vercel.app/api/get-patient?patientEmail=${email}&doctorId=1`
	);

	const data = await res.json();

	return data;
}

// Save current patient

export function savePatientInSession(cookies, patient) {
	cookies.set('patient', JSON.stringify(patient)); // handle login
}

export function getPatientFromSession(cookies) {
	const serializedPatient = cookies.get('patient');

	if (serializedPatient) {
		const patient = JSON.parse(serializedPatient);
		return patient;
	}

	return null; // or handle the case where there is no stored session
}

export function removePatientFromSession(cookies) {
	cookies.remove('patient');
}
