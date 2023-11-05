const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(mongoDB_Url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Connection failed' + error.message);
  }
};

dbConnect();
