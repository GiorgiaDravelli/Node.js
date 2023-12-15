const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const { productID, userID } = req.body;
    if (productID || userID) {
      const newOrder = new Order({ userID, productID });
      const order = await newOrder.save();
      res.status(201).json(order);
    } else {
      if (!productID || !userID) {
        throw new Error("ProductId and userID not provided");
      } else if (!productID) {
        throw new Error("ProductId not provided");
      } else {
        throw new Error("userID not provided");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " unable to create order." });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const page = req.query.page || 0
    const ordersPerPage = 5
    const orders = await Order.find().skip(page * ordersPerPage).limit(ordersPerPage)
      .populate("userID", "name surname email")
      .populate("productID", "name");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve orders." });
  }
};

exports.getAllOrdersbyDate = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);
    const page = req.query.page || 0;
    const ordersPerPage = 5;

    const orders = await Order.find({
      createdAt: {
        $gte: targetDate
      },
    }).skip(page * ordersPerPage)
      .limit(ordersPerPage)
      .populate("userID")
      .populate("productID"); 

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve orders." });
  }
};
exports.getOrderByUser = async (req, res) => {
  try {
    const { userID } = req.params;
    if (!userID) {
      return res.status(404).json({ error: "User not found." });
    }
    const page = req.query.page || 0
    const ordersPerPage = 5
    const orders = await Order.find({ userID: userID })
      .skip(page * ordersPerPage)
      .limit(ordersPerPage)
      .populate("userID", "name surname email")
      .populate("productID", "name");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found for this user." });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error + " unable to retrieve orders" });
  }
};

exports.getOrdersByUserAndDate = async (req, res) => {
  try {
    const { userID, date } = req.params;
    if (!userID) {
      return res.status(404).json({ error: "User not found." });
    }

    const targetDate = new Date(date);
    const page = req.query.page || 0
    const ordersPerPage = 5
    const orders = await Order.find({
      userID: userID,
      createdAt: {
        $gte: targetDate,
        $lt: new Date(targetDate.getTime() + 86400000),
      },
    }).skip(page * ordersPerPage)
      .limit(ordersPerPage)
      .populate("userID", "name surname email")
      .populate("productID", "name");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        error: "No orders found for this user on the specified date.",
      });
    }

    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ error: error + " unable to retrieve orders" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const updates = req.body;
    const order = await Order.findOne({ _id: orderID });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    if (updates.userID) {
      order.userID = updates.userID;
    }

    if (updates.productID) {
      order.productID = updates.productID;
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error + " Unable to update the order." });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.orderID });
    if (!order) {
      return res.status(404).json({ error: error + " Order not found." });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error + " Unable to delete the order." });
  }
};