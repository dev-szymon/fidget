import { Schema, models, model, Types, Model } from 'mongoose';
import { Provider } from './Provider';

interface IServiceSchema {
  _id: string;
  name: string;
  duration: number;
  provider: Types.ObjectId | Record<string, unknown>;
}

export interface Service extends Omit<IServiceSchema, 'provider'> {
  _id: string;
  provider: Provider;
}

const ServiceSchema = new Schema<Service, Model<Service>>({
  name: String,
  duration: Number,
  provider: { type: Types.ObjectId, ref: 'ProviderModel' },
});

const ServiceModel: Model<IServiceSchema> =
  models.Service || model<IServiceSchema>('Service', ServiceSchema);

export default ServiceModel;
