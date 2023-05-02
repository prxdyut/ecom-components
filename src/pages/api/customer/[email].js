export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
  }
  const { email } = req.query;
  const body = JSON.parse(req.body);
  const { data } = await fetch(new URL("https://api.chec.io/v1/customers"), {
    method: "GET",
    headers: {
      "X-Authorization": "sk_51741e3f1b171290f63eef283ccf688c63af49280808d",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  const user = data.filter((obj) => {
    return obj.email === email;
  });

  if (user.length === 0) {
    fetch(new URL("https://api.chec.io/v1/customers"), {
      method: "POST",
      headers: {
        "X-Authorization": "sk_51741e3f1b171290f63eef283ccf688c63af49280808d",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...body, email }),
    })
      .then((response) => response.json())
      .then((data) => res.status(200).json(data));
  } else {
    fetch(new URL("https://api.chec.io/v1/customers/" + user[0].id), {
      method: "PUT",
      headers: {
        "X-Authorization": "sk_51741e3f1b171290f63eef283ccf688c63af49280808d",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...body }),
    })
      .then((response) => response.json())
      .then((data) => res.status(200).json(data));
  }
}
