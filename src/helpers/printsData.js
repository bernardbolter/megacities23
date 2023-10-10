const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: "https://digitalcityseries.com/bolter",
  consumerKey: "ck_f8157f92df00d1293b13c616cb12597ca87b0470",
  consumerSecret: "cs_7541d425d71b9a41ef3fdf0a1c48d92590853dd8",
  version: "wc/v3"
});

export const getPrintsData = async () => {
    return await api.get(
        'products'
    )
}