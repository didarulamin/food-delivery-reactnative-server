const express = require("express");
const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL;
const client = new MongoClient(dbUrl);

app.post("/orders", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("food-delivery");
    const orders = database.collection("orders");
    const data = req.body.json();
    console.log(data, "orders");
    const doc = {
      ...data,
    };
    const result = await orders.insertOne(doc);
    res.json(result);
    console.log("connected");
  } finally {
    await client.close();
  }
});
app.post("/saveUser", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("food-delivery");
    const orders = database.collection("user");
    const data = req.body;
    console.log(data);
    const doc = {
      ...data,
    };
    const result = await orders.insertOne(doc);
    res.json(result);
    console.log("connected");
  } finally {
    await client.close();
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("food-delivery");
    const orders = database.collection("orders");

    const result = await orders.find().toArray();
    res.json(result);
    console.log("connected");
  } finally {
    await client.close();
  }
});

app.get("/allFoods", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("food-delivery");
    const foods = database.collection("foods");

    const result = await foods.find().toArray();
    res.json(result);
    console.log("connected");
  } finally {
    await client.close();
  }
});
app.get("/allRestaurant", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("food-delivery");
    const foods = database.collection("restaurant");

    const result = await foods.find().toArray();
    res.json(result);
    console.log("connected");
  } finally {
    await client.close();
  }
});

app.get("/", async (req, res) => {
  res.send("hello");
});

//server listening on
app.listen(port, () => {
  console.log("listening on port", port);
});
