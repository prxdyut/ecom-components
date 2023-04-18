import commerce from "./lib/commerce";

export async function getProduct(id) {
  var data = await commerce.products.retrieve(id, {
    type: "id",
  });
  return data;
}
export async function getProducts(slug) {
  const { data: products } = await commerce.products.list({
    category_slug: [slug],
  });
  return products;
}

export async function getCategory(slug) {
  const data = await commerce.categories.retrieve(slug, { type: "slug" });
  return data;
}

export async function getCategories() {
  const { data: categories } = await commerce.categories.list();
  return categories;
}

export async function getCart() {
  const cart = await commerce.cart.retrieve();
  return cart;
}

export async function updateCartProductQuantity(id, quantity) {
  const cart = await commerce.cart.update(id, { quantity: quantity });
  return cart;
}

export async function addToCart(id, quantity) {
  const cart = await commerce.cart.add(id, quantity);
  return cart;
}
