import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import AppointmentModel from '../../../models/Appointment';
import DayRecordModel from '../../../models/DayRecord';
import ProviderModel from '../../../models/Provider';
import ServiceModel from '../../../models/Service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    typeof req.query.queryPath === 'object' &&
    req.query.queryPath.length === 3
  ) {
    const [providerId, date, serviceId] = req.query.queryPath;

    await dbConnect();

    const provider = await ProviderModel.findById(providerId);

    const service = await ServiceModel.findById(serviceId);

    if (service && provider) {
      const [year, month, day] = date
        .split('-')
        .map((string) => Number(string));

      const appointmentsByDate = await DayRecordModel.findOne({
        provider: providerId,
        date: date,
      }).populate({ path: 'appointments', model: AppointmentModel });

      // console.log(
      //   new Date(
      //     Date.UTC(year, month - 1, day, Number(provider.workingHours.start))
      //   )
      // );

      // console.log(
      //   new Date(Date.UTC(year, month - 1, day, 13) + service.duration)
      // );
    }

    res.status(200).json({ provider });
  }
}
