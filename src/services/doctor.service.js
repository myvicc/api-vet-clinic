import { hash } from 'bcrypt';
import { Doctor } from '../mongo.models/doctors.js';
import { generateAccessToken, isPasswordsCompared } from './auth.service.js';

export async function signupDoctors({ firstName, lastName, password, email }) {
  const doctor = new Doctor({
    firstName,
    lastName,
    email,
    password: await hash(password, 10),
  });
  await doctor.save();
  return doctor;
}

export async function isUserExist(email) {
  const doctor = await Doctor.findOne({ email });
  return !!doctor;
}

export async function loginDoctor(email) {
  const doctor = await Doctor.findOne({ email });
  return generateAccessToken({ id: doctor._id });
}

export async function checkUserPassword(email, password) {
  const doctor = await Doctor.findOne({ email });
  return isPasswordsCompared(password, doctor.password);
}
