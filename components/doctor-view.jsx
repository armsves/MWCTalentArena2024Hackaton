import { getConnectionSession } from '@/lib/data';
import ReqAccessConnection from '@/components/req-access-connection';
import UserData from '@/components/user-data';
import YourPatients from '@/components/your-patients';
import { useCookies } from 'next-client-cookies';

export default function DoctorView() {
	const cookies = useCookies();

	const connectionSession = getConnectionSession(cookies);

	return (
		<div className='view admin-view'>
			{connectionSession ? <UserData /> : <ReqAccessConnection />}
			<YourPatients />
		</div>
	);
}
