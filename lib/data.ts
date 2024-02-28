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
}
