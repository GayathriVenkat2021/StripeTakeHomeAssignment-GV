const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const stripe = require('stripe')('sk_test_51JAQRjCXdpG9dZOF9FW29mzhuv2eDDILFGjJEPNlGFvWViAu1xrf3Js8bX188BUxqDuVBvoQ7CsxpmqrdVmLtPEx00dtfS3U3h');
var app = express();

var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencodedParser);

/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});

/**
 * Checkout route
 */
app.get('/checkout', function(req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300      
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      break;     
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source"
      amount = 2800  
      break;     
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"      
      break;
  }

  res.render('checkout', {
    title: title,
    amount: amount,
    error: error
  });
    
});

/**
 * Success route
 */
app.get('/success', function (req, res) {
    
    
 
    res.render('success',{
       
        query: req.query
    });
});
/**
 * Error route
 */
app.get('/error', function (req, res) {

    res.render('error');
});
app.post("/submitpayment", urlencodedParser, async function(req, res) {
    console.log(req.body);
    titledesc = req.body.item;
    amountdesc = req.body.amount / 100;
    try {
    const customer = await stripe.customers
        .create({
            name: 'Gayathri Venkat',
            email: req.body.email,
            description: 'First time customer',
            source: req.body.stripeToken
        });
    
  
    console.log(JSON.stringify(customer,null,2));
    var paramcharge = {
        amount: req.body.amount,
        currency: "usd",
        customer: customer.id
    }

    
        var chargeID = "";
        const charge = await stripe.charges.create(paramcharge);
        chargeID = JSON.stringify(charge.id);
        console.log(JSON.stringify(charge, null, 2));
        const querystring = require('querystring');

        const query = querystring.stringify({
            "paymentdetails": amountdesc,
            "checkoutdetails": chargeID,
            "titledetails": titledesc
        });
        res.redirect('/success?' + query);
    }
    catch (err) {
        console.log("err=", err)
        res.redirect('/error');
    }

  
});
/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});
