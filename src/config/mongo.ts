import mongoose from "mongoose";

const connect = () => {
  const connectionUrl = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`;

  try {
    mongoose.set("strictQuery", true);
    return mongoose.connect(connectionUrl);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default connect;
