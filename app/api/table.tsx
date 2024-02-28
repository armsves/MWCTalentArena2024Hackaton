// pages/api/table.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  const emailValue = typeof email === 'string' ? email : Array.isArray(email) ? email[0] : undefined;

  try {
    const data = await sql`SELECT * FROM your_table WHERE email = ${emailValue}`;
    const result = data.rows;

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}