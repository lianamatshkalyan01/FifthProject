const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database("database.db")
const jwt = require('jsonwebtoken')


function get_cart(req, res){
    const token= req.headers.authorization
    const decoded=jwt.decode(token)
    db.all("select * from cartitems where cartid=?", [decoded.userid],(err, data)=>{
        if(err){
            console.log(err)
        }
        res.send(data)
    })
}

function post_cart(req,res){
    const  product_id= req.body.productid;
    const token= req.headers.authorization
    const decoded=jwt.decode(token)
    db.run("insert into cartitems(cartid, productid) values(?,?)",[decoded.userid, product_id], (err,data)=>{
        if(err){
            console.log(err)
        }
        res.send('Product added to cart');
    })
}

  function delete_cart(req,res){
    const product_id = req.body.productid;
    const token= req.headers.authorization
    const decoded=jwt.decode (token)
    db.run("delete from cartitems where cartid=? and productid=?", [decoded.userid, product_id], (err,data)=>{
        if(err){
            console.log(err)
        }
        res.send('Product deleted from cart');
    })
  }

module.exports = {
 get_cart, post_cart, delete_cart
}