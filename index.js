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
    console.log(res);
    const data = req.body.initialOrder;
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

app.get("/", async (req, res) => {
  res.send("hello");
});

//server listening on
app.listen(port, () => {
  console.log("listening on port", port);
});
