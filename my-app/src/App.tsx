import React from 'react';
import PayPal from './components/PayPal/PayPal';
import StripeContainer from './components/Stripe/StripeContainer';
import './App.css';

export default function App() {
	return (
		<div className={'root'}>
			<PayPal/>
			<StripeContainer />
		</div>
	);
}
