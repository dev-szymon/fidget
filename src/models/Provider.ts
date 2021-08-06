import { Schema, model, models, Types, Model } from 'mongoose';

export interface Provider {
  name: string;
  appointments: string[];
  availability: Weekdays;
  daysOff: Date[];
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
  appointments: [{ type: Types.ObjectId, ref: 'Appointment', default: [] }],
  availability: [{ type: Number, enum: Weekdays }],
  daysOff: [{ type: Date, default: [] }],
});

const ProviderModel: Model<Provider> =
  models.Provider || model<Provider>('Provider', ProviderSchema);

export default ProviderModel;
