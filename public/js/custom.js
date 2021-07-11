/**
 * Clientside helper functions
 */

$(document).ready(function() {
  var amounts = document.getElementsByClassName("amount");

  // iterate through all "amount" elements and convert from cents to dollars
  for (var i = 0; i < amounts.length; i++) {
    amount = amounts[i].getAttribute('data-amount') / 100;  
    amounts[i].innerHTML = amount.toFixed(2);
  }
})
// Add Stripe element
const stripe = Stripe('pk_test_51JAQRjCXdpG9dZOFpu7jHrafnjVQn509BZXnuK5vPBlNMK27MScO7Yl6FW2NgIQTSik5AHH0jxouFEhBO1j63Fxp005fMs4006'); // Your Publishable Key
const elements = stripe.elements();

// Create our card inputs
var style = {
    base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};

const card = elements.create('card', { style });
card.mount('#card-element');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const stripeTokenHandler = token => {
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
    e.preventDefault();

    stripe.createToken(card).then(res => {
        if (res.error) errorEl.textContent = res.error.message;
        else stripeTokenHandler(res.token);
    })
})

