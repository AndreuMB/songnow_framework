function view(){
    var cart = localStorage.getItem("cart");
    var cart = JSON.parse(cart);
    console.log("cart", cart);
    
    if (!cart || cart.length==0){
        $("#products").html(
            '<article>'+
            '<h2>NOTHING IN THE CART</h2>'+
            '<p>Go to the <a href="' + amigable("module=shop") + '">store</a> to buy something</p>'+
            '</article>'
        )
    }else{
        var times = count(cart);
        g_promise(amigable("module=cart&function=products"))
        .then(function(data){
            var print_prod=""
            console.log(data);
            for(var i = 0;data.length > i;i++){
                // console.log(times);
                for(var x = 0;times.length > x;x++){
                    if (times[x].split(":",1)==data[i].id){
                        // console.log(times[x].split(":",1) + " == " + data[i].id);
                        item=times[x].split(":",2);
                        total=data[i].price*item[1];
                        print_prod=print_prod+
                        '<tr class="song" id="' + data[i].id + '">'+
                            '<td>' + data[i].name + '</td>'+
                            '<td>' + data[i].price + '</td>'+
                            '<td  class="item_pr"><i class="fas fa-minus operator minus" id="' + data[i].id + '"></i><input type="number" class="input_num" min="1" max="50" value="' + item[1] + '" readonly><i class="fas fa-plus operator plus" id="' + data[i].id + '"></i></td>'+
                            '<td>' + total + '</td>'+
                            '<td class="delete_pr_tb"><i class="fas fa-times delete_pr" id="' + data[i].id + '"></i></td>'+
                        '</tr>'
                    }
                }
            }
    
            $("#products").html(
                '<article>'+
                    '<h2>CART</h2>'+
                    '<table>'+
                    '<tr>'+
                    '<th>NAME</th>'+
                    '<th>PRICE</th>'+
                    '<th>UNITS</th>'+
                    '<th>TOTAL</th>'+
                    '</tr>'+
                    print_prod+
                    '</table>'+
                    '<h2 class="buy2" id="buy">BUY</h2>'+
                '</article>'
            )
    
        });
    }
}

function count(cart) {   
    var times = [];
    var cart = localStorage.getItem("cart");
    var cart = JSON.parse(cart);
    cart.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i] != current) {
            if (cnt > 0) {
                times.push(current + ":" + cnt);
            }
            current = cart[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        times.push(current + ":" + cnt);
    }
    console.log(times);
    return times;

   
}

function buy(){
    //logged?
    token=localStorage.getItem("token_data");
    var cart = localStorage.getItem("cart");
    var cart = JSON.parse(cart);
    var id_purchase=0;
    if (token){
        g_promise(amigable("module=login&function=menu"), token)
        .then(function(user){
            // var data = [user[0].username, count(cart)];
            g_promise(amigable("module=cart&function=id_purchase"))
            .then(function(data){
                console.log(data)
                if (data.length == 0){
                    id_purchase=0;
                }else{
                    var integer = parseInt(data[0].id_purchase, 10);
                    id_purchase=integer+1;
                }
                var data = {"id_purchase" : id_purchase, "product" : count(cart), "user" : user[0].username};
                g_promise(amigable("module=cart&function=buy"), data)
                .then(function(data){
                    console.log(data);
                    localStorage.removeItem('cart');
                    window.alert("Your purchase has been complete successfully");
                    window.location.href = (amigable("module=shop"));
                })
            })

        })

    }else{
        localStorage.setItem('buy', "true");
        window.location.href = amigable("module=login");
    }
}

function delete_pr(id){
    var cart = localStorage.getItem("cart");
    var cart = JSON.parse(cart);
    var i = 0;
    while (i < cart.length) {
        if(cart[i] === id) {
            cart.splice(i, 1);
        } else {
            ++i;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    view();
}

function plus(id){
    var cart = localStorage.getItem("cart");
    var cart = JSON.parse(cart);
    cart.push(id)
    localStorage.setItem("cart", JSON.stringify(cart));
    view();
}
function minus(id){
    var cart = localStorage.getItem("cart");
    var cart = JSON.parse(cart);
    var index = cart.indexOf(id);
    cart.splice(index, 1);
    console.log("cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    view();
}

$(document).ready(function () {
    view();
    $(document).on('click','.delete_pr',function () {
        var id = this.getAttribute('id');
        console.log(id);
        delete_pr(id);
    });
    $(document).on('click','.plus',function () {
        var id = this.getAttribute('id');
        plus(id);
    });
    $(document).on('click','.minus',function () {
        var id = this.getAttribute('id');
        minus(id);
    });
    $(document).on('click','#buy',function () {
        buy();
    });
});