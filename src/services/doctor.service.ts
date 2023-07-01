import { hash } from 'bcrypt';
import { Doctor } from '../mongo.models/doctors';
import { generateAccessToken, isPasswordsCompared } from './auth.service';
import { User } from '../mongo.models/users';
import { DoctorType } from '../types/doctor.type';

export async function signupDoctor({
  firstName,
  lastName,
  password,
  email,
}: Omit<DoctorType, 'id'>) {
  const doctor = new Doctor({
    firstName,
    lastName,
    email,
    password: await hash(password, 10),
  });
  await doctor.save();
  return doctor;
}

export async function isDoctorExist(email: DoctorType['email']) {
  const doctor = await Doctor.findOne({ email });
  return !!doctor;
}

export async function loginDoctor(email: DoctorType['email']) {
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    return false;
  }
  return generateAccessToken({ id: doctor._id });
}

export async function checkDoctorPassword({
  email,
  password,
}: Pick<DoctorType, 'email' | 'password'>) {
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    return 'Unknown error';
  }
  if (typeof doctor.password === 'string') {
    return isPasswordsCompared(password, doctor.password);
  }
  return 'Unknown error';
}

export const getDoctorById = async (id: Pick<DoctorType, 'id'>) => {
  const doctor = await User.findById(id);
  return doctor;
};
