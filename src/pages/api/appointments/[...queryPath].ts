import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import AppointmentModel from '../../../models/Appointment';
import DayRecordModel, { DayRecord } from '../../../models/DayRecord';
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

      const appointmentsByDate: unknown = await DayRecordModel.findOne({
        provider: providerId,
        date: date,
      }).populate({
        path: 'appointments',
        model: AppointmentModel,
      });

      const workingHoursStart = Date.UTC(
        year,
        month - 1,
        day,
        Number(provider.workingHours.start)
      );

      const workingHoursEnd = Date.UTC(
        year,
        month - 1,
        day,
        Number(provider.workingHours.end)
      );

      const generate15minArray = (start: number, end: number) => {
        const MS15MIN = 1000 * 60 * 15;
        const amount = (end - start) / MS15MIN;
        const output: number[] = [];

        for (let i = 0; i <= amount; i++) {
          output.push(start + MS15MIN * i);
        }

        return output;
      };

      if (appointmentsByDate) {
        const filteredOutStartingTimes = generate15minArray(
          workingHoursStart,
          workingHoursEnd
        ).reduce((arr: number[], serviceStart: number) => {
          const dayRecord = appointmentsByDate as DayRecord;
          return dayRecord.appointments.filter(
            ({ startTimestamp, endTimestamp }) => {
              const serviceEnd = serviceStart + service.duration;

              const isStartingBetween =
                serviceStart > Date.parse(startTimestamp) &&
                serviceStart < Date.parse(endTimestamp);
              const isEndingBetween =
                serviceEnd > Date.parse(startTimestamp) &&
                serviceEnd < Date.parse(endTimestamp);
              const isStartingTheSameTime =
                serviceStart === Date.parse(startTimestamp);

              const isOverlapping =
                isStartingBetween || isEndingBetween || isStartingTheSameTime;

              return isOverlapping;
            }
          ).length > 0
            ? arr
            : [...arr, serviceStart];
        }, []);

        return res
          .status(200)
          .json({ availableAppointmentTimes: filteredOutStartingTimes });
      }

      return res
        .status(200)
        .json({
          availableAppointmentTimes: generate15minArray(
            workingHoursStart,
            workingHoursEnd
          ),
        });
    }
  }
}
