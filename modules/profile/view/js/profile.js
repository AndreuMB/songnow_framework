function profile(){
    token=localStorage.getItem("token_data")
    g_promise(amigable("module=login&function=menu"), token)
    .then(function(user){
        console.log("profile", user);
        $("#profile").html(
            '<div id="main-wrapper">'+
            '<div class="container">'+
                '<div class="row gtr-200">'+
                    '<div class="col-4 col-12-medium">'+
                            '<div id="sidebar">'+
                                '<section class="widget thumbnails">'+
                                    '<div class="grid">'+
                                        '<div class="row gtr-50">'+
                                            '<div class="col-6"><a href="#" class="image fit"><img class="prod_img" src="'+ user[0].avatar +'" alt="" /></a></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</section>'+
                            '</div>'+
                    '</div>'+
                    '<div class="col-8 col-12-medium imp-medium">'+
                        '<div id="content">'+
                            '<section class="last">'+
                                '<h2>'+ user[0].username +'</h2>'+
                                '<ul><li>Users:'+ user[0].email +'</li><li>Price: '+ user[0].type +'</li></ul>'+
                            '</section>'+
                            '<h2 class="buy_b buy2" id="c_username">CHANGE USERNAME</h2>'+
                            '<h2 class="buy_b buy2" id="c_psswd">CHANGE PASSWORD</h2>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
        )
    })
}
$(document).ready(function () {
    profile();
    $(document).on('click','#c_username',function () {
        console.log("c_user");
    })
    $(document).on('click','#c_psswd',function () {
        console.log("c_psswd");
        token=localStorage.getItem("token_data")
        g_promise(amigable("module=login&function=menu"), token)
        .then(function(user){
            console.log(user[0].idusers);
            window.location.href =  amigable('module=login&function=cpsswd&idusers=' + user[0].idusers, false);
            // g_promise(amigable("module=login&function=cpsswd"), user[0].idusers)
            // .then(function(data){
            //     console.log(data);
            // })
        })
    })
});