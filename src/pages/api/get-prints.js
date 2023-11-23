const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

// initialise the WooCommerceRestApi 
const api = new WooCommerceRestApi({
  url: "https://digitalcityseries.com/bolter",
  consumerKey: process.env.WOOCOMMERCE_KEY,
  consumerSecret: process.env.WOOCOMMERCE_SECRET,
  version: "wc/v3"
});

// fetch all products from WooCommerce //
export default async function handler(req, res) {
  const responseData = {
    success: false,
    products: []
  }

  try {
    const { data } = await api.get(
      'products/categories/megacities'
    )
      responseData.sucess = true
      responseData.products = data

      res.json( responseData )
    } catch ( error) {
      responseData.error = error.message
      res.status( 500 ).json( responseData )
    }
}