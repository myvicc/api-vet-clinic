import { model, Schema } from 'mongoose';
import { DoctorType } from '../types/doctor.type';

const doctorsSchema = new Schema<Omit<DoctorType, 'id'>>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const Doctor = model<Omit<DoctorType, 'id'>>('doctors', doctorsSchema);
