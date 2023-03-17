const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database("database.db")

function get_cart(req, res){
    const cart_id = req.body.cartid;
    const product_id = req.body.productid
    db.all("select * from cartitems where cartid=? and productid=?", [cart_id, product_id], (err, data)=>{
        if(err){
            console.log(err)
        }
        res.send(data)
    })
}

function post_cart(req, res){
    const cart_id = req.body.cartid
    const product_id = req.body.productid
    console.log(cart_id, product_id )
    db.run("insert into cartitems(cartid, productid) values(?,?)", [cart_id, product_id], (err)=>{
        if(err){
            console.log(err)
        }
        res.send("Product added to cart")
    })
}

function delete_cart(req, res){
    const cart_id = req.body.cartid;
    const product_id = req.body.productid
    db.run("delete from cartitems where cartid=? and productid=?", [cart_id, product_id], (err)=>{
        if(err){
            console.log(err)
        }
        res.send("Product deleted from cart")
    })
}

module.exports = {
 get_cart, post_cart, delete_cart
}