import mongoose from "mongoose";
import { app } from './app';

const start = async () => {
    try {
        await mongoose.connect(
            process.env.ACTION_MONGO_URI!,
            {}
        )
        console.log('conneted to action mongo db');
    } catch (err) {
        console.error(err);
    }
};

app.listen(3000, () => {
    console.log('action service listening on port 3000');
});

start();