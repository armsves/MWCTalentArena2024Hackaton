import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const notification = searchParams.get('notification');

  try {
    //if (!petName || !ownerName) throw new Error('Pet and owner names required');
    await sql`INSERT INTO history (id_patient, history_event) VALUES (2, ${notification});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const history = await sql`SELECT * FROM history;`;
  return NextResponse.json({ history }, { status: 200 });
}