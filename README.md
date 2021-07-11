# Take home project
This is a simple e-commerce application that a customer can use to purchase a book and be able to checkout using Stripe!
.

## Application overview
This demo is written in Javascript (Node.js) with the [Express framework](https://expressjs.com/). You'll need to retrieve a set of testmode API keys from the Stripe dashboard (you can create a free test account [here](https://dashboard.stripe.com/register)) to run this locally.

We're using the [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/) CSS framework. It's the most popular CSS framework in the world and is pretty easy to get started with — feel free to modify styles/layout if you like. 

To simplify this project, we're also not using any database here, either. Instead `app.js` includes a simple switch statement to read the GET params for `item`. 

To get started, clone the repository and run `npm install` to install dependencies:

```
git clone https://github.com/mattmitchell6/sa-takehome-project-node && cd sa-takehome-project-node
npm install
```

Then run the application locally:

```
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the index page.

Click on an item to checkout.
It would take you to page where you can enter your Credit Card details to checkout.  
Example credit card number - 4111 1111 1111 1111  CVV: 788  Zip: 78717
