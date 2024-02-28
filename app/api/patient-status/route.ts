import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const notification = searchParams.get('event.deviceStatus');
  const notification2 = searchParams.get('event');

  try {
    //if (!petName || !ownerName) throw new Error('Pet and owner names required');
    await sql`INSERT INTO history (id_patient, history_event) VALUES (1, ${notification});`;
    await sql`INSERT INTO history (id_patient, history_event) VALUES (2, ${notification2});`;

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const history = await sql`SELECT * FROM history;`;
  return NextResponse.json({ history }, { status: 200 });
}