import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import ServiceModel from '../../../models/Service';
import ProviderModel from '../../../models/Provider';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { durationInMinutes, providerId } = JSON.parse(req.body);

  await dbConnect();

  const createdService = await ServiceModel.create({
    name: 'Haircut',
    duration: durationInMinutes * 60 * 1000,
    provider: providerId,
  });

  await ProviderModel.updateOne(
    { _id: providerId },
    { $push: { services: createdService.id } }
  );

  return res.status(200).json({ id: createdService.id });
}
