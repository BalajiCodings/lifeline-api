import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User(balaji) registered"});
    } catch (err) {
        res.status(400).json({ message: "Error creating user"});
    }
};

export const login = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ message: "Balaji invalid credentails"});
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login failed Mr.balaji"});
    }
};

