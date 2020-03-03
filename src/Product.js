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
        <h3 className="price">{product.price.formatted_with_symbol}</h3>
        <img className="pic" src={product.media.source} alt="" />
        <h1 className="name">{product.name}</h1>
        <h2 className="description">{formatDescription}</h2>
        <div className="cart">
        <button className="cart-button">Add to Cart</button>
        </div>
      </div>
    );
  });
  return <div className="all-cards">{cards}</div>;
}
