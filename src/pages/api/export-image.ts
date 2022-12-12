import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.body
  // fetch url into a buffer
  await fetch(url as string).then(response => {
    if (!response.ok) {
      throw new Error("Error");
    }

    return res.send(response.body);
  }).catch(error => {
    return res.status(400).json({
      message: "url image is not valid or broken"
    })
  });
}
