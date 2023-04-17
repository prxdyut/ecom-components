
import commerce from "../../../../lib/commerce";

export default async function handler(req, res) {
const { slug } = req.query
  const category = await commerce.categories.retrieve(slug, { type: 'slug' });

  res.status(200).json(category)
}