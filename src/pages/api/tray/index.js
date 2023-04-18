import commerce from "../../../lib/commerce";

export default async function handler(req, res) {
  const tray = await commerce.cart.contents();

  res.status(200).json(tray);
}
