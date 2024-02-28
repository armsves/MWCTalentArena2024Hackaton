import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams)

  const notification = searchParams.get('connectivity');
  const notification2 = searchParams.get('notifications');
  const notification3 = searchParams.get('notification');
  const notification4 = searchParams.get('device-status');

  try {
    //if (!petName || !ownerName) throw new Error('Pet and owner names required');
    await sql`INSERT INTO history (id_patient, history_event) VALUES (1, ${notification});`;
    await sql`INSERT INTO history (id_patient, history_event) VALUES (2, ${notification2});`;
    await sql`INSERT INTO history (id_patient, history_event) VALUES (3, ${notification3});`;
    await sql`INSERT INTO history (id_patient, history_event) VALUES (1, ${notification4});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const history = await sql`SELECT * FROM history;`;
  return NextResponse.json({ history }, { status: 200 });
}