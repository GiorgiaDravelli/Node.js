const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha = require("mocha");
const mongoose = require("mongoose");
const sinon = require("sinon");
const UserModel = require("../models/userModel");
const UserController = require("../controls/userController");
chai.use(chaiAsPromised); 
mongoose.connect('mongodb://127.0.0.1/orizondb')
.then(()=> console.log('Connected to the server...'))
.catch(err=> console.error('Failed to connect to the server. ' + err))

const usersData = [
  { name: "Paolo", 
    surname: "Rossi", 
    email: "paolo@rossi.com" },
  {
    name: "Anna",
    surname: "Neri",
    email: "anna@neri.com",
  },
  {
    name: "Carla",
    surname: "Carli",
    email: "carla@carli.com",
  },
];

before(async () => {
  await UserModel.insertMany(usersData);
});
describe("Test User Metods", async () => {
  it("Test createUser", async () => {
    const testUsers = {
      name: "Name",
      surname: "Surname",
      email: "example@example.com",
    };
    try {
      const req = {
        body: testUsers,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.createUser(req, res);
      sinon.assert.calledWith(res.status, 201);
      const createdUser = await UserModel.findByEmail("example@example.com");
      chai.assert.equal(createdUser.name, req.body.name, "name created");
      chai.assert.equal(
        createdUser.surname,
        req.body.surname,
        "surname created"
      );
      chai.assert.equal(createdUser.email, req.body.email, "email created");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllUsers", async () => {
    try {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.getAllUsers(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((us) => {
        if (us.email == "paolo@rossi.com") {
          found = true;
        }
      });
      chai.assert.isTrue(found, "paolo found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getUserByEmail", async () => {
    try {
      const req = {
        params: {
          email: "paolo@rossi.com",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.getUserByEmail(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundUser = res.json.getCall(0).args[0];
      chai.assert.equal(foundUser.name, "Paolo", "name found");
      chai.assert.equal(foundUser.surname, "Rossi", "surname found");
      chai.assert.equal(foundUser.email, "paolo@rossi.com", "email found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test updateUser", async () => {
    try {
      const req = {
        params: {
          email: "anna@neri.com",
        },
        body: {
          name: "NameUpdated",
          surname: "SurnameUpdated",
          email: "annaUpdated@example.com",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.updateUser(req, res);
      const UpdatedUser = res.json.getCall(0).args[0];
      chai.assert.equal(UpdatedUser.name, "NameUpdated", "name found");
      chai.assert.equal(UpdatedUser.surname, "SurnameUpdated", "surname found");
      chai.assert.equal(
        UpdatedUser.email,
        "annaUpdated@example.com",
        "email found"
      );
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
  it("Test deleteUser", async () => {
    try {
      const req = {
        params: {
          email: "paolo@rossi.com",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.deleteUser(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundUser = await UserModel.findByEmail("paolo@rossi.com");

      chai.assert.isNull(foundUser, "paolo non trovato");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
});