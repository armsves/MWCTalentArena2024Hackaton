import { sql } from '@vercel/postgres'

let patients: any = [];
let medicalCenter: any = [];

export default async function Geofencing() {
    let data, dataCenter;
    let showdata = false;

    const url = 'https://location-verification.p-eu.rapidapi.com/verify'
    const headers = {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '57f72d34a8msh0ddd05839e901ccp115120jsn4cec2eada6b1',
        'X-RapidAPI-Host': 'location-verification.nokia.rapidapi.com'
    }

    try {
        data = await sql`SELECT * FROM patients`;
        patients = data.rows;
        if (patients.length > 0) {
            dataCenter = await sql`SELECT * FROM medical_center`;
            medicalCenter = dataCenter.rows;


            /*
            const data = {
                device: { phoneNumber: patients[0].phone_number, },
                area: {
                    areaType: 'Circle',
                    center: { latitude: medicalCenter[0].latitude, longitude: medicalCenter[0].longitude },
                    radius: 1000
                }, maxAge: 60
            }

            const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
            if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
            const responseData = await response.json();
            if (responseData.verificationResult === 'TRUE') { showdata = true; }
            */
        }
    } catch (e: any) { throw e; }

    return (
        <>
            <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
                <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Hospital: {patients.length > 0 && medicalCenter[0].name}</h2>
                        <p className="text-sm text-gray-500">Patient Data</p>
                    </div>
                </div>

                <div className="">
                    {patients &&
                        patients.map(async (patient: any) => {
                            const data = {
                                device: { phoneNumber: patient.phone_number, },
                                area: {
                                    areaType: 'Circle',
                                    center: { latitude: medicalCenter[0].latitude, longitude: medicalCenter[0].longitude },
                                    radius: 1000
                                }, maxAge: 60
                            }

                            const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
                            if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
                            const responseData = await response.json();
                            if (responseData.verificationResult === 'TRUE') { showdata = true; }

                            return (
                                <>
                                    <div className="flex items-center justify-between py-3">
                                        <p>{patient.name}</p>
                                        <p>{patient.email}</p>
                                        <p>{patients.id_center}</p>
                                        <p>{showdata ? "Patient is in your area" : "Patient is NOT in your area"}</p>
                                    </div>

                                </>
                            )
                        })}

                    <h2 className="text-xl font-semibold">Hospital: {patients.length > 0 && medicalCenter[1].name}</h2>
                    {patients &&
                        patients.map(async (patient: any) => {
                            const data = {
                                device: { phoneNumber: patient.phone_number, },
                                area: {
                                    areaType: 'Circle',
                                    center: { latitude: medicalCenter[1].latitude, longitude: medicalCenter[1].longitude },
                                    radius: 100
                                }, maxAge: 60
                            }

                            const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
                            if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
                            const responseData = await response.json();
                            if (responseData.verificationResult === 'TRUE') { showdata = true; }

                            return (
                                <>
                                    <div className="flex items-center justify-between py-3">
                                        <p>{patient.name}</p>
                                        <p>{patient.email}</p>
                                        <p>{patients.id_center}</p>
                                        <p>{showdata ? "Patient is in your area" : "Patient is NOT in your area"}</p>
                                    </div>

                                </>
                            )
                        })}

                    <h2 className="text-xl font-semibold">Hospital: {patients.length > 0 && medicalCenter[2].name}</h2>
                    {patients &&
                        patients.map(async (patient: any) => {
                            const data = {
                                device: { phoneNumber: patient.phone_number, },
                                area: {
                                    areaType: 'Circle',
                                    center: { latitude: medicalCenter[2].latitude, longitude: medicalCenter[2].longitude },
                                    radius: 1000
                                }, maxAge: 60
                            }

                            const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
                            if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
                            const responseData = await response.json();
                            if (responseData.verificationResult === 'TRUE') { showdata = true; }

                            return (
                                <>
                                    <div className="flex items-center justify-between py-3">
                                        <p>{patient.name}</p>
                                        <p>{patient.email}</p>
                                        <p>{patients.id_center}</p>
                                        <p>{showdata ? "Patient is in your area" : "Patient is NOT in your area"}</p>
                                    </div>

                                </>
                            )
                        })}

                </div>
            </div>
        </>
    );
}
