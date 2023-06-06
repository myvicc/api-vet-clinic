import mongoose from "mongoose";

export const connect = async () =>
    mongoose.connect('mongodb://localhost:27019', {
        user: 'mongo',
        pass: 'mypass',
    });