import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface FormData {
  origin: string;
  metrics: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const formData: FormData = req.body;

  try {
    const response = await axios.post(
      `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=`,
      {
        formFactor: 'PHONE',
        origin: formData.origin,
        metrics: formData.metrics,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
