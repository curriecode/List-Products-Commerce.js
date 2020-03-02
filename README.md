# List Products With The Commerce.js SDK

An integration guide to help developers list products from the Chec API using the Commerce.js SDK.

This project is built with the Commerce.js SDK v2.

## Overview

In this guide you will learn how to:

1. Install the Commerce.js SDK
2. Make a call to the Chec API using the SDK
3. Use the response from the API to list products on a website or web app

### Requirements

- IDE Code Editor: VSCode, Atom, Sublime
- NPM or yarn
- Basic HTML
- JavaScript

### Installing Commerce.js

Use our Commerce.js SDK to access the Chec API data from your application.

_Choose either one of the installation methods:_

1. Installing via CDN in the body of your `index.html`

```
<script type="text/javascript" src="https://assets.chec-cdn.com/v2/commerce.js"></script>

```

2. Installing via SDK with NPM in the command line

```
npm install @chec/commerce.js
```

### Getting Started

1. Create a [Chec dashboard account](https://dashboard.chec.io/signup) enable Commerce.js to get API keys and list your products along with prices, images and product descriptions.

2. If you haven't already installed the Commerce.js SDK in your project or inserted the CDN into the index.html make sure to do so now following the installation steps above.

3. Import the Commerce.js SDK into your script and create a commerce instance with your Chec API key.

```js
import Commerce from "@chec/commerce.js";

const commerce = new Commerce("chec_api_key_goes_here", true);
```

4. Make a call to the Chec API. This will send back a data object that has all the information about your listed products. You can console log the response to see all the details contained in the data object.

   ```js
   commerce.products
     .list()
     .then(result => {
       console.log(result.data);
     })
     .catch(err => {
       console.log("ERROR", err);
     });
   ```

5. Use the respose to populate your webpage. Depending which framework you're using you can save the data object to a variable or to state, then map over it to dynamically retrive all product items and details from the check API. Here's an example using React.js.

```js
//App.js

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
```

```js
//Product.js a component that will dynamically render product cards for each item by mapping over the data object from the API and accessing the name, description, price and image.

export default function(props) {
  //Dynamically renders product cards based on response from Chec API
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
  return <div className="all-cards">{cards}</div>;
}
```

To see the full React.js demo
[Click Here](https://github.com/curriecode/List-Products-Commerce.js)

## Contributing Sources

- [Chec](https://github.com/chec)
- [Commerce.js SDK](https://github.com/chec/commerce.js)

See also the list of [contributors](https://github.com/curriecode/List-Products-Commerce.js) who participated in this project.
