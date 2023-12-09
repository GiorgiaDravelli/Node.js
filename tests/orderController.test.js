const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha = require("mocha");
const mongoose = require("mongoose");
const sinon = require("sinon");
const OrderModel = require("../models/orderModel");
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");
const ProductController = require("../controls/productController");
const UserController = require("../controls/userController");
const OrderController = require("../controls/orderController");
const orderModel = require("../models/orderModel");
chai.use(chaiAsPromised);
mongoose.connect('mongodb://127.0.0.1/orizondb')
.then(()=> console.log('Connected to the server...'))
.catch(err=> console.error('Failed to connect to the server. ' + err))


let users = [];
let products = [];
let ordersData = [];
before(async () => {
  const usersData = [
    { name: "Paolo1", 
    surname: "Rossi1", 
    email: "paolo1@rossi1.com" },
    {
      name: "Anna1",
      surname: "Neri1",
      email: "anna1@neri1.com",
    },
    {
      name: "Carla1",
      surname: "Carli1",
      email: "carla1@carli1.com",
    },
  ];
  const productsData = [
    { name: "Milano-Lecce" },
    { name: "Parigi-Torino" },
    { name: "Parma-Napoli" },
    { name: "Londra-Parigi" },
  ];
  await UserModel.insertMany(usersData);
  await ProductModel.insertMany(productsData);

  users = await UserModel.find();
  products = await ProductModel.find();
  ordersData = [
    {
      userID: users[0]._id,
      productID: products[0]._id,
      createdAt: new Date("2023-12-08").getTime(),
    },
    {
      userID: users[0]._id,
      productID: products[1]._id,
    },
  ];

  await OrderModel.insertMany(ordersData);
});

describe("Test Order Metods", async () => {
  it("Test createOrder", async () => {
    try {
      const req = {
        body: {
          userID: users[1]._id,
          productID: products[1]._id,
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.createOrder(req, res);
      sinon.assert.calledWith(res.status, 201);
      const createdOrder = res.json.getCall(0).args[0];
      chai.assert.equal(createdOrder.userID, req.body.userID, "user created");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllorders", async () => {
    try {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.getAllOrders(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((or) => {
        if (or.userID._id.equals(ordersData[0].userID)) {
          found = true;
        }
      });
      chai.assert.isTrue(found, "order found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllOrdersbyDate", async () => {
    try {
      const req = {
        params: {
          date: "2023-12-08",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.getAllOrdersbyDate(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((or) => {
        if (or.userID._id.equals(ordersData[0].userID)) {
          found = true;
        }
      });
      chai.assert.isTrue(found, "order found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllOrdersbyUser", async () => {
    try {
      const req = {
        params: {
          userID: ordersData[0].userID,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.getOrderByUser(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((or) => {
        if (or.userID._id.equals(ordersData[0].userID)) {
          found = true;
        }
      });
      chai.assert.isTrue(found, "order found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getOrdersByUserAndDate", async () => {
    try {
      const req = {
        params: {
          userID: ordersData[0].userID,
          date: "2023-12-08",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.getOrderByUser(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((or) => {
        if (or.userID._id.equals(ordersData[0].userID)) {
          found = true;
        }
      });
      chai.assert.isTrue(found, "order found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test updateOrder", async () => {
    try {
      const ordered = await orderModel.find();
      const req = {
        params: {
          orderID: ordered[0]._id,
        },
        body: {
          userID: users[2]._id,
          productID: products[2],
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.updateOrder(req, res);
      const UpdatedOrder = res.json.getCall(0).args[0];
      chai.assert.equal(UpdatedOrder.userID, req.body.userID, "user updated");
      chai.assert.equal(
        UpdatedOrder.orderID,
        req.body.orderID,
        "order updated"
      );
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
  it("Test deleteOrder", async () => {
    try {
      const ordered = await orderModel.find();
      const req = {
        params: {
          orderID: ordered[0]._id,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.deleteOrder(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundOrder = await OrderModel.findById(ordered[0]._id);
      chai.assert.isNull(foundOrder, "order not founded");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
});