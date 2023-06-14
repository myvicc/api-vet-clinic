import mongoose from 'mongoose';

export const connect = async () =>
  mongoose.connect('mongodb://localhost:27017', {
    user: 'mongo',
    pass: 'mypass',
  });
