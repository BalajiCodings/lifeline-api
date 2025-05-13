import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {type: string, required: true},
    email: {type: string, unique: true},
    password: {type: string, required: true}
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//module.exports = mongoose.model('User', userSchema);
const User = mogoose.model('User', userSchema);
export default User;