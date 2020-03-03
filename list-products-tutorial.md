# List Products With The Commerce.js SDK Demo

A demo for listing products from the Chec API using the Commerce.js SDK in your React.js application.

Commerce.js SDK v2.

[Live Demo](https://commercejs-react-demo.herokuapp.com/)

## Overview

In this guide you will learn how to:

1. Install the Commerce.js SDK
2. Make a call to the Chec API using the SDK
3. Use the response from the API to list products in your web app

### Requirements

- IDE Code Editor: VSCode, Atom, Sublime
- NPM or yarn
- HTML
- CSS
- JavaScript
- React.js

### Installing Commerce.js

Use our Commerce.js SDK to access the Chec API data from your application.

_Choose either one of the installation methods:_

1. Installing via CDN in the body of your `index.html`

```html
<script
  type="text/javascript"
  src="https://assets.chec-cdn.com/v2/commerce.js"
></script>
```

2. Installing via SDK with NPM or yarn from the command line in the root directory of your project.

```js
//npm command

npm install @chec/commerce.js
```

```js
//yarn command

yarn add @chec/commerce.js
```

### Prerequisites

List prerequisite knowledge if any.
 - JavaScript(ES6)
 - React.js (functional components and hooks)
 - Basic HTML
 - Basic CSS

### Project Usage

A step by step series on injecting Commerce.js logic into a React App.

1. Create a [Chec dashboard account](https://dashboard.chec.io/signup) and click to enable Commerce.js. Go to the developers section to retrieve an API key. Create your products in the dashboard along with prices, images and product descriptions.
   
2. If you do not yet have a React application setup you can do so in the terminal using the command `npx create-react-app your-project-name`. Also see create-react-app [docs](https://reactjs.org/docs/create-a-new-react-app.html)

3. If you haven't already installed the Commerce.js SDK in your project or inserted the CDN into the `index.html` make sure to do so now following the installation steps above.

4. If using create-react-app remove all boilerplate code from App.js. If you already have an application set up ignore this step.
   
5. At the top of your App.js file import the Commerce.js SDK into your script and then create a new Commerce instance with your Chec API key. This will allow you to access all these [features](https://commercejs.com/docs/overview/getting-started.html#features) from your Commerce object instance.
    ```js
    App.js

    import Commerce from "@chec/commerce.js";

    const commerce = new Commerce("chec_api_key_goes_here", true);
    ```

6. In App.js write a function to call the Chec API. When invoked the API will return a data object containing all the information about your listed products. You can console log the response to see all the details contained within the object.

```js
  
  App.js

  function callChecApi() {
    commerce.products
      .list()
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }
  
```
7. Next, below where you declared the callChecApi function use the React [useEffect](https://reactjs.org/docs/hooks-effect.html) hook to invoke the callChecApi function on page load. This means when the page loads in the browser, the function will be called and send a request to the Chec API for the all the product info and details.

```js
  useEffect(() => {
    callChecApi()
  },[])
```

```js
//The object that the Chec API sends back will look similar to this:

id: "prod_67896876"
created: 1567898
last_updated: 1567897986
active: true
permalink: "MglY6"
name: "Extra Sturdy Wrist Brace"
description: "<p>Keep carpal tunnel under control and code pain free with this super sturdy wrist brace!</p>"
price: {raw: 100, formatted: "100.00", formatted_with_symbol: "$100.00", formatted_with_code: "100.00 USD"}
quantity: 0
media: {type: "image", source: "https://assets.chec-cdn.com/images"}

```
Note that you can access this object the same way you would access a normal JavaScript object.

For example to access the name of the first product: `result.data[0].name` 

8. Now that you are getting response data from the Chec API you will need to store it somewhere for later access. For this task use the react hook [useState](https://reactjs.org/docs/hooks-state.html) which will allow you to not only store the data object but also pass it as props making use of the data in other components.

By now App.js should be looking like this:

```js

//App.js

import React, { useState, useEffect } from "react";
import Commerce from "@chec/commerce.js";

const commerce = new Commerce("chec_api_key_goes_here", true);


export default function App () {

  let [prodInfo, setProdInfo] = useState([]);

  //makes request to Chec API and stores response in prodInfo variable
  function apichec() {
    commerce.products
      .list()
      .then(result => {
        //Updates useState with the data object from the Chec API
        //prodInfo variable will contain the contents of the data object
        setProdInfo(result.data);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }
  useEffect(() => {
    callChecApi()
  },[])

}
```

9. Now that you have all the product data it's time to put it to work and dynamically render it into your application. 

At the top of App.js import Product.js (you will create this file soon).

```js
import Product from "./Product";

```

In App.js and below useEffect return a component called Product and pass it the useState variable `prodInfo` as props, which is storing the data object:

```js
  return (
    //renders product cards
    <div>
      <Product 
      prodInfo={prodInfo}
      />
    </div>
  );

```

In the same folder as App.js create a file called Product.js. This is where you will create the product cards to display the name, price, image and description of all your products. 

We need to create the JSX template in Product.js for your cards that will hold the product details. In a minute we will use the props `props.prodInfo` but for now here's an example of what it will look like:

```js
//Product.js 
  export default function Product() {
      <div className="card" key={key}>
        <h3 className="price">
        // You can use {props.prodInfo[0].name} to get the name of the first product
        {Price will go here}</h3>
        <img className="pic" src={Picture will go here} alt="" />
        <h1 className="name">{Name will go here}</h1>
        <h2 className="description">{Description will go here}</h2>
        <div className="cart">
        <button className="cart-button">Add to Cart</button>
        </div>
      </div>
  }

```

To dynamically list all of the items from the Chec API you will need to use [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to loop over the card template, which will create a card for each item. 

Finally to format the description use [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) to remove the HTML `<p>` tags from the beginning and end of the text.  

Here's what the final template will look like:

```js
//Product.js

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

```


NOTE: In the same folder as Product.js create a file called Product.css and add your own styling using the corresponding classNames or copy and paste [these styles](https://github.com/curriecode/List-Products-Commerce.js/blob/master/src/Product.css) into your Product.css.


Your final App.js will look like this:

```js
//App.js

import React, { useState, useEffect } from "react";
//imports commerce/js SDK
import Commerce from "@chec/commerce.js";
//imports the Product component
import Product from "./Product";
//creates an instance to call the SDK -- api key can be inserted here  directly
//or stored in environment variable for greater security
const commerce = new Commerce(process.env.REACT_APP_API_KEY, true);

export default function App() {
  //useState updates to pass API response data to Product component
  let [prodInfo, setProdInfo] = useState([]);

  //makes request to Chec API and stores response in prodInfo variable
  function callChecApi() {
    commerce.products
      .list()
      .then(result => {
        console.log(result.data)
        setProdInfo(result.data);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  //useEffect will call the chec API on page load to list all products from the API
  useEffect(() => {
    callChecApi()
  }, [])

  return (
    //renders product cards
    <div>
      <Product 
      prodInfo={prodInfo}
      />
    </div>
  );
}
```

To see the full React.js demo on GitHub
[Click Here](https://github.com/curriecode/List-Products-Commerce.js)

## Contributing Sources

- [Chec](https://github.com/chec)
- [Commerce.js SDK](https://github.com/chec/commerce.js)

See also the list of [contributors](https://github.com/curriecode/List-Products-Commerce.js) who participated in this project.