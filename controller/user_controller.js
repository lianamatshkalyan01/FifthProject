const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database("database.db")
const CryptoJS = require('crypto-js')
const jwt_generate = require("../jwt/jwt_generate")

function get_product (req, res){
    db.all("select * from products", [], (err, data)=>{
        res.send(data)
    })
}

function get_product_id (req, res){
    const id = req.params.id
    db.get("select * from products where id=?", [id], (err, data)=>{
        res.send(data)
    })
}

function post_product(req, res){
    const name = req.body.name
    const price = req.body.price
    db.run("insert into products(name, price) values(?,?)", [name, price], ()=>{
        res.send("OK")
    })
}

function put_product (req, res){
    const name = req.body.name
    const price = req.body.price
    const id = req.params.id
    db.run("update products set name=?, price=? where id=?", [name, price, id], ()=>{
        res.send("OK")
    })
}

function delete_product(req,res){
    const id = req.params.id
    db.get("delete from products where id=?", [id], ()=>{
        res.send("OK")
    })
}

function register_user(req, res){
    const name = req.body.name
    const username = req.body.username
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString()
    db.run("insert into users(name, role, username, password) values(?,?,?,?)", [name, "user", username, hashed_password],(err)=>{
        if(err){
            res.send(JSON.stringify({status: "Error Reigstering"}))
        }
        res.send(JSON.stringify({status: "User Created"}))
    })
}


function login_user(req, res){
        const username = req.body.username
        const password = req.body.password
        const hashed_password = CryptoJS.SHA256(password).toString()
        db.get("select * from users where username=?", [username], (err, row)=>{
            let token = jwt_generate.generateAccessToken({username, userid: row.id, role: row.role})
            if(username == row.username && hashed_password == row.password){
                res.send(JSON.stringify({status: "Logged in", jwt:token}))
            }else{
                res.send(JSON.stringify({status: "Wrong credentials"}))
            }    
        })
    }


module.exports = {
    get_product, get_product_id, post_product, put_product, delete_product, register_user, login_user
}