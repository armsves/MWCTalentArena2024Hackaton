import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('patientEmail');
    const doctorId = searchParams.get('doctorId');
    let patients, physician: any = [];
    let medicalCenter: any = [];
    let data, dataCenter, dataPhysician;

    try {
        if (!email || !doctorId) throw new Error('Patient email and doctor ID are required');
        data = await sql`SELECT * FROM patients WHERE email = ${email}`;
        patients = data.rows;
        if (patients.length > 0) {
            dataPhysician = await sql`SELECT * FROM physicians WHERE id = ${doctorId}`;
            physician = dataPhysician.rows;
            dataCenter = await sql`SELECT * FROM medical_center WHERE id = ${physician[0].id_center}`;
            medicalCenter = dataCenter.rows;

            const url = 'https://location-verification.p-eu.rapidapi.com/verify'
            const headers = {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '57f72d34a8msh0ddd05839e901ccp115120jsn4cec2eada6b1',
                'X-RapidAPI-Host': 'location-verification.nokia.rapidapi.com'
            }
            const data = {
                device: { phoneNumber: patients[0].phone_number, },
                area: {
                    areaType: 'Circle',
                    center: { latitude: medicalCenter[0].latitude, longitude: medicalCenter[0].longitude },
                    radius: 100
                },
                maxAge: 60
            }

            const response = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
            if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
            const responseData = await response.json();
            //console.log('Response data:', responseData.verificationResult);
            if (responseData.verificationResult === 'TRUE') { 
                return NextResponse.json({ patients }, { status: 200 });
            } else {
                return NextResponse.json( "patient not in your location" , { status: 200 });
            }
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }

}
