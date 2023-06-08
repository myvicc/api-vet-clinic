import bcrypt from 'bcrypt';
import { Doctor } from '../mongo.models/doctors.js';
import { passwordIsCorrect } from '../utilities.js';

export async function signupDoctors(body) {
  const existingDoctor = await Doctor.findOne({
    email: body.email,
  });
  if (existingDoctor) {
    throw new Error('Doctor with such email has already existed');
  }
  // if (!passwordIsCorrect(body.password)) {
  //   console.log('body.password', body.password);
  //   throw new Error('Password does not comply with the requirements');
  // }

  const doctor = new Doctor({
    firstName: body.firstName,
    lastNane: body.lastNane,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
  });
  await doctor.save();
  console.log('save to bd');
  return doctor;
}
