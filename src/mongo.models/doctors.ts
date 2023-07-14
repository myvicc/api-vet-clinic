import { model, Schema } from 'mongoose';
import { DoctorType } from '../types/Doctor.type';

const doctorsSchema = new Schema<Omit<DoctorType, 'id'>>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const Doctor = model<DoctorType>('doctors', doctorsSchema);
