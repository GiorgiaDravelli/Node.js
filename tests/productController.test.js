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
  { 
    name: "Milano-Lecce",
    id: "1" 
  },
  { 
    name: "Parigi-Torino",
    id: "2" 
  },
  { 
    name: "Parma-Napoli",
    id: "3" 
  },
  { 
    name: "Londra-Parigi",
    id: "4"  
  }, 
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

  it("Test getProductById", async () => {
    try {
      const req = {
        params: {
          name: "Milano-Lecce",
          id: "1"
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.getProductById(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundProduct = res.json.getCall(0).args[0];

      chai.assert.equal(foundProduct.id, "1", "id found");
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
          id: "2"
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.deleteProduct(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundProduct = await ProductModel.findById("2");
      chai.assert.isNull(foundProduct, "Id 2 non trovato");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
});