
import commerce from "../../../../../lib/commerce";

export default async function handler(req, res) {
const { id } = req.query
  const product = await commerce.products.retrieve(id, { type: 'id' });

  res.status(200).json({ product })
}