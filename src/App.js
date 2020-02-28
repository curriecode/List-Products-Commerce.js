import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import Commerce from "@chec/commerce.js";
const commerce = new Commerce(
  "pk_1784477b7bd2dc0841e1125b4bb84674c27de3cc87938",
  true
);

export default function App() {
  let [prodName, setProdName] = useState("");
  function apichec() {
    commerce.products
      .list()
      .then(result => {
        console.log(result.data);
        let names = result.data.map(
          product =>
            product.name +
            product.description +
            product.price.formatted_with_symbol +
            product.media.source
        );
        setProdName(names);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }
  return (
    <div>
      <button onClick={apichec}>ADD PRODUCT</button>
      {prodName}
    </div>
  );
}
