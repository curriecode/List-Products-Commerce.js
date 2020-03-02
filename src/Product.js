import React from "react";
import "./Product.css";

export default function(props) {
  //Dynamically renders product cards based on response from Chec API
  const cards = props.prodInfo.map(product => {
    //removes <p> from beginning of description string
    let formatDescription = product.description.slice(3);
    //removes </p> from end of description string
    formatDescription = formatDescription.slice(0, -4);
    let key = product.id;
    return (
      <div className="card" key={key}>
        <h1>{product.name}</h1>
        <h2>{formatDescription}</h2>
        <h3>{product.price.formatted_with_symbol}</h3>
        <img className="pic" src={product.media.source} alt="" />
      </div>
    );
  });
  return <div className="all-cards">{cards}</div>;
}
