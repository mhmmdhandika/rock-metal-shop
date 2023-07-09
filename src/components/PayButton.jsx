// import StripeCheckout from 'react-stripe-checkout';

function PayButton() {
  const { STRIPE_PUBLISHABLE_KEY } = process.env;

  const onToken = token => {
    console.log(token);
  };

  return <div>Pay</div>;
}
export default PayButton;
