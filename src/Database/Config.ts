import Mongoose from "mongoose";

async function connectToDb() {
  try {
    await Mongoose.connect(
      "mongodb+srv://OmarDev:j5ubngGF2ugX5Nsi@varia-art.chokhbr.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.log(error);
  }
}

export { connectToDb };
