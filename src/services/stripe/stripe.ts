import Stripe from 'stripe';
import { stripeKey } from '../../config/keys';

const stripe = new Stripe(stripeKey);

// Create New Customer
export async function createCustomer(
  email: string,
  token: string,
  metadata: any
): Promise<Stripe.customers.ICustomer> {
  return await stripe.customers.create({
    email,
    source: token,
    metadata,
  });
}

// Create New Charge
export async function createCharge(
  amount: number,
  customerID: string,
  metadata: any
): Promise<Stripe.charges.ICharge> {
  return await stripe.charges.create({
    amount,
    currency: 'usd',
    description: 'Press Express Las Vegas',
    customer: customerID,
    metadata,
  });
}

// Create New Refund
export async function createRefund(
  amount: number,
  chargeID: string,
  metadata: any
): Promise<Stripe.refunds.IRefund> {
  return await stripe.refunds.create({
    charge: chargeID,
    amount,
    metadata,
  });
}
