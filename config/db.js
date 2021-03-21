const mongoose = require('mongoose')

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI ,{
         useUnifiedTopology: true, 
         useNewUrlParser: true,
         useCreateIndex: true
      })
      console.log(`MngoDB Connect: ${conn.connection.host}`);
   } catch (error) {
      console.log(`Error: ${error.menssage}`);
      process.exit(1)
   }
};

module.exports = connectDB