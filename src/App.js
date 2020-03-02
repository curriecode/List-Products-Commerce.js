import "./App.css";
import React, { useState } from "react";
//imports commerce/js SDK
import Commerce from "@chec/commerce.js";
import Product from "./Product";
//creates an instance to call the SDK -- api key can be inserted here  directly
//or stored in environment variable for greater security
const commerce = new Commerce(process.env.REACT_APP_API_KEY, true);

export default function App() {
  //useState updates to pass API response data to Product component
  let [prodInfo, setProdInfo] = useState([]);

  //makes request to Chec API and stores response in prodInfo variable
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
    //renders button with click handler that triggers API request
    //renders product cards
    <div>
      <h1 className="title">
        List Products From Chec API Using Commerce.js SDK
      </h1>
      <button className="button" onClick={apichec}>
        ADD PRODUCT
      </button>
      <Product prodInfo={prodInfo} />
    </div>
  );
}
