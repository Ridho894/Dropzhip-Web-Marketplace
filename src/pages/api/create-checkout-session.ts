import env from "@/config/env";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.stripe_secret_key);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { items, email } = req.body;
    // const transformedItems = items.map((item: { description: string; price: number; title: string; image: string; quantity: number; }) => ({
    //     description: item.description,
    //     quantity: item.quantity,
    //     price_data: {
    //         currency: "IDR",
    //         unit_amount: item.price * 100,
    //         product_data: {
    //             name: item.title,
    //             images: [item.image],
    //         },
    //     },
    // }));
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
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "IDR",
                    unit_amount: 20000 * 100,
                    product_data: {
                        name: "tes dev 1",
                        images: ["https://stripe-camo.global.ssl.fastly.net/4358dfb34b9fc87700cffcb94997ce2fbaced757c99fd4eefa3d8c4fc1eba50f/68747470733a2f2f66616b6573746f72656170692e636f6d2f696d672f373159587a654f75736c4c2e5f41435f55593837395f2e6a7067"],
                    },
                },
            }
        ],
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
