
import commerce from "../../../../lib/commerce";

export default async function handler(req, res) {
const { slug } = req.query
  const products = await commerce.products.list({
  category_slug: [slug],
});

  res.status(200).json([ ...products.data ])
}