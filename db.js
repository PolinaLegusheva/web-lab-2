const mongoose = require('mongoose');

const { Schema, model } = mongoose;

require('dotenv').config();

mongoose.connect("mongodb+srv://polinaleg2003:IIIzPGUXys7fEb3a@cluster0.kl0sptb.mongodb.net/", {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch(() => {
    console.log("Connection error");
    process.exit()
  });

  const Event = new Schema({
    name: String,
    content: String,
    date: String,
    startTime: String,
  });
  
  const EventModel = model('Event', Event);
  
  module.exports = {
    EventModel
  }