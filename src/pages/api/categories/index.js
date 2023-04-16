
import commerce from "../../../lib/commerce";

export default async function handler(req, res) {
  const { data: categories } = await commerce.categories.list();

  res.status(200).json({ ...categories })
}