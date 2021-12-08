const mongoose = require("mongoose");
const uri =
  "mongodb+srv://dbUser:dbUser@cluster0.vz7qs.mongodb.net/MovieBooking?retryWrites=true&w=majority";
module.exports = {
  async getConnectDB() {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connect to database successfully");
      })
      .catch(console.log);
  },
};
