import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeForm from './StripeForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ''); 

const StripeContainer = () => {
	return (
		<Elements stripe={stripePromise}>
			<StripeForm/>
		</Elements> 
	);  
};
      
export default StripeContainer;
