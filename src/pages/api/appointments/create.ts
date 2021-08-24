import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import AppointmentModel from '../../../models/Appointment';
import DayRecordModel from '../../../models/DayRecord';
import ProviderModel from '../../../models/Provider';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const providerId = '611586d59197e22560b9d2c9';

  const newAppointment = await AppointmentModel.create({
    startTimestamp: '2021-08-18T16:00:00.000Z',
    endTimestamp: '2021-08-18T16:45:00.000Z',
    provider: providerId,
    service: '61224c52ef86fb3dbc524479',
  });

  const monthRecord = await DayRecordModel.findOne({
    provider: providerId,
    date: '2021-08-18',
  });

  if (monthRecord) {
    await monthRecord.updateOne({
      $push: { appointments: newAppointment._id },
    });
  } else {
    const newMonthRecord = await DayRecordModel.create({
      provider: providerId,
      date: '2021-08-18',
      appointments: [newAppointment._id],
    });

    await ProviderModel.findOneAndUpdate(
      { _id: providerId },
      { $push: { appointmentsByDate: newMonthRecord._id } }
    );
  }

  return res.status(200).json({ name: 'John Doe' });
}
