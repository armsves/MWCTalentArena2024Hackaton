import { sql } from '@vercel/postgres'

let patients: any = [];
let medicalCenters: any = [];

export default async function Geofencing() {
    let data, dataCenter;
    let showdata = false;

    const url = 'https://location-verification.p-eu.rapidapi.com/verify'
    const headers = {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '57f72d34a8msh0ddd05839e901ccp115120jsn4cec2eada6b1',
        'X-RapidAPI-Host': 'location-verification.nokia.rapidapi.com'
    }
    const url2 = 'https://location-retrieval.p-eu.rapidapi.com/retrieve'
    const headers2 = {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '57f72d34a8msh0ddd05839e901ccp115120jsn4cec2eada6b1',
        'X-RapidAPI-Host': 'location-retrieval.nokia.rapidapi.com'
    }

    try {
        data = await sql`SELECT * FROM patients`;
        patients = data.rows;
        if (patients.length > 0) {
            dataCenter = await sql`SELECT * FROM medical_center`;
            medicalCenters = dataCenter.rows;
        }
    } catch (e: any) { throw e; }

    return (
        <>
            <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-screen-xl mx-auto w-full">
                <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1"><h2 className="text-xl font-semibold">Name</h2></div>
                    <div className="space-y-1 p-3"><h2 className="text-xl font-semibold">Phone Number</h2></div>
                    <div className="space-y-1 p-3"><h2 className="text-xl font-semibold">Latitude</h2></div>
                    <div className="space-y-1 p-3"><h2 className="text-xl font-semibold">Longitude</h2></div>
                    <div className="space-y-1 p-3"><h2 className="text-xl font-semibold">{medicalCenters[0].name}</h2></div>
                    <div className="space-y-1 p-3"><h2 className="text-xl font-semibold">{medicalCenters[1].name}</h2></div>
                    <div className="space-y-1 p-3"><h2 className="text-xl font-semibold">{medicalCenters[2].name}</h2></div>
                </div>
                <div className="">
                    {patients &&
                        patients.map(async (patient: any) => {
                            const data2 = { device: { phoneNumber: patient.phone_number }, maxAge: 60 }
                            const response2 = await fetch(url2, { method: "POST", headers: headers2, body: JSON.stringify(data2) });
                            const responseData2 = await response2.json();

                            return (
                                <>
                                    <div className="flex items-center justify-between py-3">
                                        <p>{patient.name}</p>
                                        <p>{patient.phone_number}</p>
                                        <p>{responseData2.area.center.latitude}</p>
                                        <p>{responseData2.area.center.longitude}</p>

                                        {medicalCenters &&
                                            medicalCenters.map(async (medicalCenter: any) => {
                                                const data = {
                                                    device: { phoneNumber: patient.phone_number, },
                                                    area: {
                                                        areaType: 'Circle',
                                                        center: { latitude: medicalCenter.latitude, longitude: medicalCenter.longitude },
                                                        radius: 200
                                                    }, maxAge: 60
                                                }
                                                const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
                                                if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
                                                const responseData = await response.json();
                                                if (responseData.verificationResult === 'TRUE') { showdata = true; }
                                                return (
                                                    <>
                                                        <p className={showdata ? 'text-green-500' : 'text-red-500'}>
                                                            {showdata ? 'Patient is in your area' : 'Patient is NOT in your area'}
                                                        </p>

                                                    </>
                                                )
                                            })}
                                    </div>

                                </>
                            )
                        })}
                </div>
            </div>
        </>
    );
}
