import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to balaji's database");
    } catch (error) {
        console.error(" Database connection error:", error);
        process.exit(1);
    }
}

export default connectDB;