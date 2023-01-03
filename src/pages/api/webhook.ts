import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import createOrder from "@/services/orders/create.service";

const stripe = require("stripe")(process.env.stripe_secret_key);
const endpointSecret = process.env.stripe_signing_secret

const fulfillOrder = async (session: any) => {
    return createOrder({
        price: 2000,
        product_id: 1,
        product_quantity: 2,
        total: 4000
    })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;
        // Verify that the event posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error: any) {
            console.log("ERROR", error.message);
            return res.status(400).send(`Webhook error: ${error.message}`);
        }
        // Handle the checkout session completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            return fulfillOrder(session).then(() => res.status(200))
                .catch((error) =>
                    res.status(400).send(`Webhook Error: ${error.message}`)
                );;
            // Fulfill the order
            // return fulfillOrder(session)
            //   .then(() => res.status(200))
            //   .catch((error) =>
            //     res.status(400).send(`Webhook Error: ${error.message}`)
            //   );
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};