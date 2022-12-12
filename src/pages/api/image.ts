import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (!url) return res.status(400).json({
    code: 400,
    message: "url query is required"
  })

  try {
    const img = await fetch(url as string);
    const body = await img.body;
    const contentType = await img.headers.get('content-type')

    if (!contentType) throw new Error("Error");

    res.setHeader('Content-Type', contentType);
    return res.send(body)
  } catch (e) {
    return res.status(400).json({
      message: "url image is not valid or broken"
    })
  }
}
