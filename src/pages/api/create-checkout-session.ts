import env from "@/config/env";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.stripe_secret_key);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { items, email } = req.body;
    const transformedItems = items.map((item: { description: string; price: number; name: string; image: string; stock: number; }) => ({
        // name: item.description,
        quantity: item.stock,
        price_data: {
            currency: "IDR",
            unit_amount: item.price * 1000,
            product_data: {
                name: item.name,
                description: item.description,
                images: [item.image],
            },
        },
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // shipping_options: ["shr_1MMAMxF5A1GcksE08LA34fhP"],
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: { amount: 20, currency: 'idr' },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: { unit: 'business_day', value: 5 },
                        maximum: { unit: 'business_day', value: 7 },
                    },
                },
            },
        ],
        shipping_address_collection: {
            allowed_countries: ["ID", "SG"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${env.HOST}/success`,
        cancel_url: `${env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item: { image: string; }) => item.image)),
        },
    });
    res.status(200).json({ id: session.id });
};
