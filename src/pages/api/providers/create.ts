// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import ProviderModel from '../../../models/Provider';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const newProvider = await ProviderModel.create({
    name: 'Beauty Salon',
    availability: [1, 2, 3, 4, 5],
  });

  console.log(newProvider);

  res.status(200).json({ name: 'John Doe' });
}
