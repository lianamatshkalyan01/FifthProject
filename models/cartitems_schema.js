const sql = ("Create table if not exists cartitems(id integer primary key, cartid integer, productid integer, foreign key(cartid) references cart(id), foreign key(productid) references products(id))")

function create_cartitems(my_database){
    my_database.run(sql)
}

module.exports = {create_cartitems}