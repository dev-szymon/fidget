import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import ProviderModel from '../../../models/Provider';
import ServiceModel from '../../../models/Service';
import MonthRecordModel from '../../../models/DayRecord';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (id) {
    await dbConnect();

    const provider = await ProviderModel.findById(id)
      .populate({
        path: 'services',
        model: ServiceModel,
      })
      .populate({
        path: 'appointmentsByDate',
        model: MonthRecordModel,
      });

    res.status(200).json({ provider });
  }
}
