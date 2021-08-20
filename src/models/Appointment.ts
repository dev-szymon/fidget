import { Schema, models, model, Types, Model } from 'mongoose';
import { Service } from './Service';
import { Provider } from './Provider';

interface IAppointmentSchema {
  startTimestamp: string;
  endTimestamp: string;
  client: Types.ObjectId | Record<string, unknown>;
  provider: Types.ObjectId | Record<string, unknown>;
  service: Types.ObjectId | Record<string, unknown>;
}

export interface Appointment
  extends Omit<IAppointmentSchema, 'provider' | 'service'> {
  _id: string;
  provider: Provider;
  service: Service;
}

const AppointmentSchema = new Schema<
  IAppointmentSchema,
  Model<IAppointmentSchema>
>({
  startTimestamp: { type: Date },
  endTimestamp: { type: Date },
  client: { type: Types.ObjectId, ref: 'ClientModel' },
  provider: { type: Types.ObjectId, ref: 'ProviderModel' },
  service: { type: Types.ObjectId, ref: 'ServiceModel' },
});

const AppointmentModel: Model<IAppointmentSchema> =
  models.Appointment ||
  model<IAppointmentSchema>('Appointment', AppointmentSchema);

export default AppointmentModel;
