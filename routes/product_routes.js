const product_controller = require("../controller/product_controller")
const jwt_authenticate = require("../jwt/jwt_authenticate")

function create_cartitems_get(app){
    app.get("/cart", jwt_authenticate.authenticateTokenCart, product_controller.get_cart)
}

function create_cartitems_post(app){
    app.post("/cart/add", jwt_authenticate.authenticateTokenCart, product_controller.post_cart)
}

function create_cartitems_delete(app){
    app.delete("/cart/delete", jwt_authenticate.authenticateTokenCart, product_controller.delete_cart)
}

module.exports = {
    create_cartitems_get, create_cartitems_post, create_cartitems_delete
}