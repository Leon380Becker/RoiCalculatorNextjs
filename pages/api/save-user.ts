// /pages/api/save-user.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN as string;

if (!HUBSPOT_ACCESS_TOKEN) {
  throw new Error("Please define the HUBSPOT_ACCESS_TOKEN in .env.local");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing name or email' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send to HubSpot
    const hubspotResponse = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        properties: {
          email: email,
          firstname: name,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ HubSpot contact created:', hubspotResponse.data);

    return res.status(200).json({ message: 'User sent to HubSpot' });
  } catch (err: any) {
    console.error('❌ Error sending to HubSpot:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to send user to HubSpot' });
  }
}
