import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  
  const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!HUBSPOT_ACCESS_TOKEN) {
    console.error('❌ Missing HUBSPOT_ACCESS_TOKEN in environment');
    return res.status(500).json({ error: 'Internal server error' });
  }

  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing name or email' });
    }

    // Validate email format
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
    // Improved error logging
    console.error('❌ Error sending to HubSpot:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });

    return res.status(500).json({ error: 'Failed to send user to HubSpot' });
  }
}
