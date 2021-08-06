import { Schema, models, model, Types, Model } from 'mongoose';

interface Appointment {
  startDate: number;
  endDate: number;
  client: Types.ObjectId | Record<string, unknown>;
  provider: Types.ObjectId | Record<string, unknown>;
  service: Types.ObjectId | Record<string, unknown>;
}
const AppointmentSchema = new Schema<Appointment, Model<Appointment>>({
  startDate: Number,
  endDate: Number,
  client: { type: Types.ObjectId, ref: 'Client' },
  provider: { type: Types.ObjectId, ref: 'Provider' },
  service: { type: Types.ObjectId, ref: 'Service' },
});

const AppointmentModel: Model<Appointment> =
  models.Appointment || model<Appointment>('Appointment', AppointmentSchema);

export default AppointmentModel;
