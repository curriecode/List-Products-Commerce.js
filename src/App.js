import "./App.css";
import React, { useState } from "react";
import Commerce from "@chec/commerce.js";
import Product from "./Product";
const commerce = new Commerce(
  "pk_1784477b7bd2dc0841e1125b4bb84674c27de3cc87938",
  true
);

export default function App() {
  let [prodInfo, setProdInfo] = useState([]);

  function apichec() {
    commerce.products
      .list()
      .then(result => {
        setProdInfo(result.data);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }
  return (
    <div>
      <button onClick={apichec}>ADD PRODUCT</button>
      <Product prodInfo={prodInfo} />
    </div>
  );
}
