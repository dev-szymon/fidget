import { Schema, model, models, Types, Model } from 'mongoose';
import { Service } from './Service';
import { DayRecord } from './DayRecord';

export interface IProviderSchema {
  name: string;
  appointmentsByDate: Types.ObjectId[] | Record<string, unknown>[];
  services: Types.ObjectId[] | Record<string, unknown>[];
  availability: Weekdays[];
  daysOff: number[];
  workingHours: {
    start: string;
    end: string;
  };
}

export interface Provider
  extends Omit<IProviderSchema, 'services' | 'appointmentsByDate'> {
  _id: string;
  services: Service[];
  appointmentsByDate: DayRecord[];
}

// by default enum starts with 0 but we can assign any default number and the following properties will continue with values incremented by 1
enum Weekdays {
  'monday' = 1,
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
}

const ProviderSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  services: [
    {
      type: Types.ObjectId,
      ref: 'ServiceModel',
      default: [],
    },
  ],
  appointmentsByDate: [
    { type: Types.ObjectId, ref: 'DayRecordModel', default: [] },
  ],
  availability: [{ type: Number, enum: Weekdays }],
  daysOff: [{ type: Number, default: [] }],
  workingHours: {
    start: String,
    end: String,
  },
});

const ProviderModel: Model<IProviderSchema> =
  models.Provider || model<IProviderSchema>('Provider', ProviderSchema);

export default ProviderModel;
