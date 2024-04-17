import mongoose from "mongoose";
import configKeys from "../../../config";
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rakshithkalmadi:rakshithkalmadi@tutortrek.rmkqvbz.mongodb.net/", {
      dbName: configKeys.DB_NAME,
    });
    console.log(`Database connected successfully`.bg_green);
  } catch (error: any) {
    console.log(`Database connected unsuccessfully`.bg_red);
    process.exit(1);
  }
};
export default connectDB;
