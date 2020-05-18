function profile(){
    token=localStorage.getItem("token_data")
    g_promise(amigable("module=login&function=menu"), token)
    .then(function(user){
        console.log("profilep", user);
        $("#profilep").html(
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
                                '<ul><li>Email: '+ user[0].email +'</li><li>Type: '+ user[0].type +'</li></ul>'+
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
function c_psswd(){
    token=localStorage.getItem("token_data")
    g_promise(amigable("module=login&function=menu"), token)
    .then(function(user){
        console.log(user[0].idusers);
        window.location.href =  amigable('module=login&function=cpsswd&idusers=' + user[0].idusers, false);
    })
}

function submituser(){
    $("#formcuser").submit(function (e) {
		e.preventDefault();
		// if(validationC() != 0){
            console.log("enter");
            token=localStorage.getItem("token_data")
            g_promise(amigable("module=login&function=menu"), token)
            .then(function(user){
                console.log(user[0].idusers);
                var data = $("#formcuser").serializeArray();
                data = {
                    idusers : user[0].idusers,
                    username : data[0].value
                }
                console.log(data);
                g_promise(amigable("module=profile&function=c_user"), data)
                .then(function(data){
                    console.log(data);
                    window.location.href =  amigable('module=profile');
                    
                })
            })
        // }
    });
}

function c_user(){
    $('#profilep').empty();
    $("#profilep").html(
        '<div class="row">'+
            '<div class="col-12 col-12-medium">'+
                '<form method="post" id="formcuser">'+
                    '<div class="register">'+
                        '<h1>Change username</h1>'+
                        '<label for="username"><b>Username</b></label>'+
                        '<input type="text" placeholder="Enter Username" name="user" id="user" required>'+
                        '<p class="error" id="e_user"></p>'+
                        '<hr>'+
                        '<input type="submit" id="change" value="Change"/>'+
                    '</div>'+
                '</form>'+
            '</div>'+
        '</div>'
    )
    submituser();
}


$(document).ready(function () {
    console.log("profile");
    profile();
    $("#formcuser").submit(function (e) {
        console.log("eneter");
    });
    $(document).on('click','#c_username',function () {
        c_user();
    })
    $(document).on('click','#c_psswd',function () {
        c_psswd();
    })
});