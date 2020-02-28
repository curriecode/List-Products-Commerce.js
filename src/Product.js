import React from "react";
import "./Product.css";

export default function(props) {
  // console.log("inside prodict", props.name);

  return (
    <div className="card">
      <h1>{props.name}</h1>
      <h2>{props.description}</h2>
      <h3>{props.price}</h3>
      <img className="pic" src={props.photo} />
    </div>
  );
}
