function products(){
    console.log("products");
    g_promise(amigable("module=shop&function=products"))
    .then(function(data){
        console.log(data);
        $('#products').empty();

        var products=""

                         
        for(var i=0;i<data.length;i++){
            products=products+
        '<div class="col-4 col-12-medium">'+
            '<section class="box feature">'+
                '<a href="#" class="image featured prod_img" id="' + data[i].id + '"><img src="' + data[i].img + '" alt="" /></a>'+
                '<div class="inner prod_title">'+
                    '<header>'+
                        '<h2>' + data[i].name + '</h2>'+
                    '</header>'+
                    '<h2 class="buy_b buy" id="' + data[i].id + '">BUY</h2>'+
                '</div>'+
            '</section>'+
        '</div>'

        }
        $("#products").html(
            products
            )                  
        })

}
function product_read(id){
    g_promise(amigable("module=shop&function=read"), id)
    .then(function(data){
        console.log(data);
        $('#products').empty();

        var img_shop=""
                         
        // for(var i=0;i<data.length;i++){
            img_shop=
                '<a href="#" class="image featured prod_img" id="prod' + data[0].id + '"><img src="' + data[0].img + '" alt="" /></a>'

        // }
        $("#products").html(
            '<div id="main-wrapper">'+
            '<div class="container">'+
                '<div class="row gtr-200">'+
                    '<div class="col-4 col-12-medium">'+
                            '<div id="sidebar">'+
                                '<section class="widget thumbnails">'+
                                    '<div class="grid">'+
                                        '<div class="row gtr-50">'+
                                            '<div class="col-6"><a href="#" class="image fit"><img class="prod_img" src="'+ data[0].img +'" alt="" /></a></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</section>'+
                            '</div>'+
                    '</div>'+
                    '<div class="col-8 col-12-medium imp-medium">'+
                        '<div id="content">'+
                            '<section class="last">'+
                                '<h2>'+ data[0].name +'</h2>'+
                                '<ul><li>Users:'+ data[0].users +'</li><li>Price: '+ data[0].price +'</li></ul>'+
                            '</section>'+
                            '<h2 class="buy_b buy2" id="' + data[0].id + '">ADD TO CART</h2>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'

            )                  
        })

}

function add_cart(id){
    var cart = localStorage.getItem("cart");
    if (cart){
            var cart = JSON.parse(cart);
            console.log("add",cart);
            cart.push(id);
            localStorage.setItem('cart', JSON.stringify(cart));
    }else{
        var cart = [id];
        console.log("create",cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

$(document).ready(function () {
    products();

    $(document).on('click','.prod_img',function () {
        var id = this.getAttribute('id');
        product_read(id);

    });

    $(document).on('click','.buy_b',function () {
        var id = this.getAttribute('id');
        console.log(id);
        // token=localStorage.getItem("token_data");
        // if (token){
            toastr["success"]("Your product has been add to cart");
            add_cart(id);
        // }else{
        //     var cart = [id];
        //     localStorage.setItem('cart', JSON.stringify(cart));
        //     window.location.href = amigable("module=login");
        // }
    });
});