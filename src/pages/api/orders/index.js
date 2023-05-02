export default async function handler(req, res) {
  const { user } = req.query;
  const url = new URL("https://api.chec.io/v1/customers/" + user + "/orders");

  const headers = {
    "X-Authorization": "sk_51741e3f1b171290f63eef283ccf688c63af49280808d",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => res.status(200).send(data));
}
