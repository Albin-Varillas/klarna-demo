import express from "express";
const app = express();

const products = [
  { id: 1, price: 57, name: "Table" },
  { id: 2, price: 12, name: "Chair" },
  { id: 3, price: 99, name: "House" },
];

app.get("/", (req, res) => {
  res.send(
    products
      .map((products) => `<a href="/p/${products.id}">${products.name}</a>`)
      .join("")
  );
});

app.listen(3000);
