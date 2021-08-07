// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import ProviderModel from '../../../models/Provider';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (id) {
    await dbConnect();

    const provider = await ProviderModel.findById(id);
    res.status(200).json({ provider });
  }
}
