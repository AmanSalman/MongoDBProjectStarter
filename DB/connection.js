import mongoose from "mongoose";


export const connectDB = async () => {
	return mongoose.connect(process.env.MONGO_URL).then(result => console.log("DB connected")).catch((err) => {
		console.log(`error detected ${err}`)
	})
};
