import { createCharge, createCustomer } from '../../services/stripe';
import { formatPhone } from '../../utils';
import validate from './checkoutValidation';
import { sendTextNoResponse } from '../../services/twilio';
import { DateTime } from 'luxon';

interface PaymentReturn {
  stripe_charge: string;
  stripe_customer: string;
  phone: string;
  error: string;
  message: string;
}

async function payment(payload: any): Promise<PaymentReturn> {
  // Create order object and metadata object
  const orderFields = { ...payload };
  const metadata = {
    email: orderFields.email,
    name: orderFields.name,
    phone: '',
    total_price: orderFields.total_price,
    hotel: orderFields.hotel,
    room: orderFields.room,
    pickup_date: orderFields.pickup_date,
    return_date: orderFields.return_date,
  };

  try {
    try {
      // Validation
      validate(orderFields);

      // Format phone number - fails on error
      const formattedPhone = formatPhone(orderFields.phone);
      metadata.phone = formattedPhone;
      orderFields.phone = formattedPhone;
    } catch (e) {
      console.log(e);
      // Return the validation error if it doesnt work
      return {
        stripe_charge: '',
        stripe_customer: '',
        phone: '',
        error: 'validation',
        message: e.message,
      };
    }

    // Create Stripe customer
    const customer = await createCustomer(
      orderFields.email,
      orderFields.stripeToken,
      metadata
    );

    delete orderFields.stripeToken;

    // Create Stripe Charge
    const charge = await createCharge(
      orderFields.total_price,
      customer.id,
      metadata
    );

    // Send text notification, dont wait for a response
    sendTextNoResponse(
      `New order ${orderFields.hotel} - pickup at ${DateTime.fromMillis(
        +orderFields.pickup_date
      )
        .setZone('America/Los_Angeles')
        .toFormat('EEEE h:mm a')}`,
      process.env.PERSONAL_PHONE as string
    );

    // Return Stripe Charge and Customer ID
    return {
      stripe_charge: charge.id,
      stripe_customer: customer.id,
      phone: orderFields.phone,
      error: '',
      message: 'Successfully completed payment',
    };
  } catch (e) {
    // If stripe fails return payment error
    return {
      stripe_charge: '',
      stripe_customer: '',
      phone: '',
      error: 'payment',
      message: e.message,
    };
  }
}

export default payment;
