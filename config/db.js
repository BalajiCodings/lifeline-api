import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI;
        await mongoose.connect(mongoURI, {
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