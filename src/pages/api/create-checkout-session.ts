import env from "@/config/env";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(env.STRIPE_SECRET_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { items, email } = req.body;
    const transformedItems = items.map((item: { description: string; price: number; title: string; image: string; }) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: "IDR",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1KcW70HvinNXNCqaAPBy0Tdy"],
        shipping_address_collection: {
            allowed_countries: ["IDR", "MY", "SG"],
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
