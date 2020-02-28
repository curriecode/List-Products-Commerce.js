import React from "react";
import "./Product.css";

export default function(props) {
  // console.log("inside prodict", props.name);
  const cards = props.prodInfo.map(product => {
    let key = product.id;
    return (
      <div className="card" key={key}>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>{product.price.formatted_with_symbol}</h3>
        <img className="pic" src={product.media.source} />
      </div>
    );
  });
  return <div>{cards}</div>;
}
