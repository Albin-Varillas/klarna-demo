import express from "express";
const app = express();
import { createOrder, retriveOrder } from "./klarna.js";
import { config } from "dotenv";
config();

const products = [
  { id: "1", price: 57, name: "Table" },
  { id: "2", price: 12, name: "Chair" },
  { id: "3", price: 99, name: "House" },
];

app.get("/", (req, res) => {
  res.send(
    products
      .map((product) => `<a href="/p/${product.id}">${product.name}</a>`)
      .join("")
  );
});

app.get("/p/:id", async (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  const data = await createOrder(product);
  res.send(data.html_snippet);
});

app.get("/confirmation", async (req, res) => {
  const data = await retriveOrder(req.query.order_id);
  res.send(data.html_snippet);
});

app.listen(3000);
