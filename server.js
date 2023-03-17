const  express = require('express')
const sqlite3 = require('sqlite3').verbose()
const product_schema = require("./models/products_schema")
const user_schema = require("./models/users_schema")
const cart_schema = require("./models/cart_schema")
const cartitems_schema = require("./models/cartitems_schema")
const user_routes = require('./routes/users_routes')
const product_routes = require('./routes/product_routes')
const CryptoJS = require('crypto-js')
const app = express()
const port = 5000
app.use(express.json())
const jwt = require('jsonwebtoken')
require('dotenv').config()

let db = new sqlite3.Database("database.db", (err)=>{
    if(err){
        console.log("Error")
    }
    console.log("Connected to the database")
})

product_schema.create_products(db)
user_schema.create_users(db)
cart_schema.create_cart(db)
cartitems_schema.create_cartitems(db)
user_routes.create_users_routes_get(app)
user_routes.create_users_routes_get_id(app)
user_routes.create_users_routes_post(app)
user_routes.create_users_routes_put(app)
user_routes.create_users_routes_delete(app)
user_routes.create_users_routes_register(app)
user_routes.create_users_routes_login(app)
product_routes.create_cartitems_get(app)
product_routes.create_cartitems_post(app)
product_routes.create_cartitems_delete(app)

app.listen(port)


