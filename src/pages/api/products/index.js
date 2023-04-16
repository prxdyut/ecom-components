import commerce from "../../../lib/commerce";

export default async function handler(req, res) {
  const { slug } = req.query;
  const { data: products } = await commerce.products.list();

  res.status(200).json({ products });
}
