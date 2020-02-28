import "./App.css";
import React, { useState } from "react";
import Commerce from "@chec/commerce.js";
import Product from "./Product";
const commerce = new Commerce(process.env.REACT_APP_API_KEY, true);

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
