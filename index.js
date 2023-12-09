const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { EventModel } = require('./db')

app.use(bodyParser.json());

app.post("/event", async (req, res) => {
    try {
      const event = new EventModel(req.body);
      await event.save();
      res.status(201).send(event);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.get("/event", async (req, res) => {
    try {
      const events = await EventModel.find();
      res.send(events);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get("/event/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        return res.status(404).send("Event not found");
      }
      res.send(event);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put("/event/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const event = await EventModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!event) {
        return res.status(404).send("Event not found");
      }
      res.send(event);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.patch("/event/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const event = await EventModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!event) {
        return res.status(404).send("Event not found");
      }
      res.send(event);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.delete("/event/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const event = await EventModel.findByIdAndDelete(id);
      if (!event) {
        return res.status(404).send("Event not found");
      }
      res.send(event);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
app.listen(3000, () => {
    console.log('Starting the server on port 3000');
});

module.exports = app;