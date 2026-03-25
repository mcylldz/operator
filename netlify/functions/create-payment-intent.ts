
import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-12-15.clover',
});

// Price map per variant (in cents)
const PRICE_MAP: Record<string, number> = {
    A: 9700,  // $97
    B: 19700, // $197
};

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { items, customer, variant } = JSON.parse(event.body || '{}');

        // Price determined by variant, fallback to A ($97)
        const safeVariant = variant === 'B' ? 'B' : 'A';
        const amount = PRICE_MAP[safeVariant];
        const priceUsd = amount / 100;

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: {
                product: 'Roasell Operatör Sistemi',
                ab_variant: safeVariant,
                price_usd: String(priceUsd),
                customerName: customer?.name,
                customerEmail: customer?.email,
                customerPhone: customer?.phone,
            },
            receipt_email: customer?.email,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                clientSecret: paymentIntent.client_secret,
                variant: safeVariant,
                priceUsd,
            }),
        };
    } catch (error) {
        console.error('Stripe Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Payment processing failed' }),
        };
    }
};

export { handler };
