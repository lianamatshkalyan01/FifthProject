const sql = ("create table if not exists cart(id integer primary key, user_id integer, foreign key(user_id) references users(id))")

function create_cart(my_database){
    my_database.run(sql)
}

module.exports = {create_cart}