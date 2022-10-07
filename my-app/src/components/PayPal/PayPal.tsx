import React from 'react';
import {
	PayPalButtons,
	PayPalButtonsComponentProps,
	PayPalScriptProvider,
	usePayPalScriptReducer
} from '@paypal/react-paypal-js';
import {PayPalScriptOptions} from '@paypal/paypal-js/types/script-options';
import styles from './PayPal.module.scss';

const paypalScriptOptions: PayPalScriptOptions = {
	'client-id':
		process.env.REACT_APP_PAYPALL_CLIENT_ID || '',
	currency: 'USD'
};

const PayPalButtonsContainer = () => {
	const [{ isPending }] = usePayPalScriptReducer();

	const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
		style: { layout: 'vertical' },
		createOrder(data, actions) {
			return actions.order.create({
				purchase_units: [
					{
						description: 'Some purchase description',
						amount: {
							value: '12.13'
						}
					}
				]
			});
		},
		onApprove: (data, actions) => {
			/**
			 * data: {
			 *   orderID: string;
			 *   payerID: string;
			 *   paymentID: string | null;
			 *   billingToken: string | null;
			 *   facilitatorAccesstoken: string;
			 * }
			 */
			return actions?.order?.capture().then((details) => {
				alert('Operation Success');
				console.log('Data details: ' + JSON.stringify(data, null, 2));
			})  as Promise<void>;
		},
		onError: (err) => {
			alert('Error Occurred');
			console.log('Error:', err);
		}
	};

	return (
		<>
			{isPending ? <h2>Load Smart Payment Button...</h2> : null}
			<PayPalButtons {...paypalbuttonTransactionProps} />
		</>
	);
};

// eslint-disable-next-line no-mixed-spaces-and-tabs
const PayPal = () => {
	return (
		<div className={styles.root}>
			<PayPalScriptProvider options={paypalScriptOptions}>
				<PayPalButtonsContainer/>
			</PayPalScriptProvider>
		</div>
	);
};

export default PayPal;