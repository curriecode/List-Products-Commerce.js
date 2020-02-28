import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import Commerce from "@chec/commerce.js";
import Product from "./Product";
const commerce = new Commerce(
  "pk_1784477b7bd2dc0841e1125b4bb84674c27de3cc87938",
  true
);

export default function App() {
  let [prodName, setProdName] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [photo, setPhoto] = useState("");

  function apichec() {
    commerce.products
      .list()
      .then(result => {
        console.log(result.data);
        result.data.map(product => {
          setProdName(product.name);
          setDescription(product.description);
          setPrice(product.price.formatted_with_symbol);
          setPhoto(product.media.source);
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }
  return (
    <div>
      <button onClick={apichec}>ADD PRODUCT</button>
      <Product
        name={prodName}
        description={description}
        price={price}
        photo={photo}
      />
    </div>
  );
}
