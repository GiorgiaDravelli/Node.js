const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha = require("mocha");
const mongoose = require("mongoose");
const sinon = require("sinon");
const ProductModel = require("../models/productModel");
const ProductController = require("../controls/productController");
chai.use(chaiAsPromised);
mongoose.connect('mongodb://127.0.0.1/orizondb')
.then(()=> console.log('Connected to the server...'))
.catch(err=> console.error('Failed to connect to the server. ' + err))

const productsData = [
  { name: "Milano-Lecce" },
  { name: "Parigi-Torino" },
  { name: "Parma-Napoli" },
  { name: "Londra-Parigi" }, 
];

before(async () => {
  await ProductModel.insertMany(productsData);
});
describe("Test Product Metods", async () => {
  it("Test createProduct", async () => {
    const testProducts = {
      name: "Milano-Torino",
    };
    try {
      const req = {
        body: testProducts,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.createProduct(req, res);
      sinon.assert.calledWith(res.status, 201);
      const createdProduct = await ProductModel.findByName("Milano-Torino");
      chai.assert.equal(createdProduct.name, req.body.name, "name created");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllProducts", async () => {
    try {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.getAllProducts(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((fl) => {
        if (fl.name == "Milano-Lecce") {
          found = true;
        }
      });
      chai.assert.isTrue(found, "flight found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getProductByName", async () => {
    try {
      const req = {
        params: {
          name: "Milano-Lecce",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.getProductByName(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundProduct = res.json.getCall(0).args[0];

      chai.assert.equal(foundProduct.name, "Milano-Lecce", "name found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test updateProduct", async () => {
    try {
      const req = {
        params: {
          name: "Milano-Lecce",
        },
        body: {
          name: "NameUpdated",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.updateProduct(req, res);
      const UpdatedProduct = res.json.getCall(0).args[0];
      chai.assert.equal(UpdatedProduct.name, "NameUpdated", "name found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
  it("Test deleteProduct", async () => {
    try {
      const req = {
        params: {
          name: "Parigi-Torino",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.deleteProduct(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundProduct = await ProductModel.findByName("Parigi-Torino");
      chai.assert.isNull(foundProduct, "Parigi-Torino non trovato");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
});