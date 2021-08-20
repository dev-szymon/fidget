import { Schema, models, model, Types, Model } from 'mongoose';
import { Appointment } from './Appointment';
import { Provider } from './Provider';

interface IDayRecordSchema {
  date: string;
  provider: Types.ObjectId | Record<string, unknown>;
  appointments: Types.ObjectId[] | Record<string, unknown>[];
}

export interface DayRecord
  extends Omit<IDayRecordSchema, 'provider' | 'appointments'> {
  _id: string;
  provider: Provider;
  appointments: Appointment[];
}

const DayRecordSchema = new Schema<IDayRecordSchema, Model<IDayRecordSchema>>({
  date: String,
  provider: { type: Types.ObjectId, ref: 'ProviderModel' },
  appointments: [{ type: Types.ObjectId, ref: 'AppointmentModel' }],
});

const DayRecordModel: Model<IDayRecordSchema> =
  models.DayRecord || model<IDayRecordSchema>('DayRecord', DayRecordSchema);

export default DayRecordModel;
