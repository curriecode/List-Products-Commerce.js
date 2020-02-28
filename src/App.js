import "./App.css";
import axios from "axios";
import React from "react";
import Commerce from "@chec/commerce.js";
const commerce = new Commerce("process.env.REACT_APP_CHEC_API_KEY", true);

function apichec() {
  axios
    .get(commerce)
    .then(res => {
      console.log("SUCCESS", res);
    })
    .catch(err => {
      console.log("ERROR", err);
    });
}

export default function App() {
  return <button onClick={apichec}>ADD PRODUCT</button>;
}
