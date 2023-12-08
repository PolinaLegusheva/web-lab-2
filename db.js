const mongoose = require('mongoose');

const { Schema, model } = mongoose;

require('dotenv').config();

mongoose.connect(process.env.MONGODB_KEY, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch((e) => {
    console.log(e,"Connection error");
    process.exit()
  });

  const Event = new Schema({
    name: String,
    content: String,
    date: String,
    startTime: String,
    endTime: String,
  });
  
  const EventModel = model('Event', Event);
  
  module.exports = {
    EventModel
  }