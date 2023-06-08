import jwt from 'jsonwebtoken';
import { Doctor } from '../mongo.models/doctors.js';
import bcrypt from 'bcrypt';

const SECRET_WORD = 'my secret';

export async function loginDoctor(body) {
  const doctor = await Doctor.findOne({ email: body.email });
  if (!doctor) {
    throw new Error('data is incorrect');
  }
  const isPasswordValid = await bcrypt.compare(body.password, doctor.password);
  if (!isPasswordValid) {
    throw new Error('data is incorrect');
  }
  const token = await jwt.sign({ id: doctor.id }, SECRET_WORD, {
    expiresIn: '20m',
  });
  console.log(token);
  return token;
}
