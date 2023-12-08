const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require('lodash');

const { EventModel } = require('./db')

const app = require("./index");
const { event, differentEvent } = require("./constants");

const eventKeys = Object.keys(event);

chai.use(chaiHttp);
const expect = chai.expect;

  describe("Post", () => {
    it("Should create a new event", async () => {
      new EventModel(event)
      console.log(await EventModel.find());
  
      const res = await chai
        .request(app)
        .post("/event")
        .send(event);
  
      console.log("Response:", res.error);
      console.log("Body:", res.body);
  
      expect(res).to.have.status(201);
      expect(_.pick(res.body, eventKeys)).to.deep.equal(event);
    });
  });

  describe("Get", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/event")
        .send(event)
  
      createdEvent = response.body;
    });
  
    it("Should get all event", async () => {
      const res = await chai
        .request(app)
        .get("/event");
  
      expect(res.body).to.be.an("array");
      expect(res.body.some(event => event._id === createdEvent._id)).to.be.true;
    });
  
    it("Should get one event by id", async () => {
      const res = await chai
        .request(app)
        .get(`/event/${createdEvent._id}`);
  
      expect(res.body).to.deep.equal(createdEvent);
    });
  })

  describe("Update", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/event")
        .send(event)
  
        createdEvent = response.body;
    });
  
    it("Should update(put) event by id", async () => {
      const res = await chai
        .request(app)
        .put(`/event/${createdEvent._id}`)
        .send(differentEvent);
  
      expect(res.body).to.deep.equal({ ...createdEvent, ...differentEvent });
    });
  })

  describe("Delete", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/event")
        .send(event)
  
        createdEvent = response.body;
    });
  
    it("Should delete event by id", async () => {
      const res = await chai
        .request(app)
        .delete(`/event/${createdEvent._id}`);
  
      expect(res.body).to.deep.equal(createdEvent);
    });
  })