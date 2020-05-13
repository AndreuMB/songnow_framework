function lang(lang) {
    // Save preferences
    lang = lang || localStorage.getItem('app-lang') || 'english';
    localStorage.setItem('app-lang', lang);
  
    var allang = document.querySelectorAll('[data-tr]');
  
    $.ajax({
        url: '/songnow_framework/view/assets/langs/' + lang + '.json',
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
          console.log(data);
          for (var i = 0; i < allang.length; i++) {
            allang[i].innerHTML = data.hasOwnProperty(lang)
            ? data[lang][allang[i].dataset.tr]
            : allang[i].dataset.tr;
          }
        }
    });
}
  

function print_menu(){
    console.log("print_menu");
    token=localStorage.getItem("token_data")
    g_promise(amigable("module=login&function=menu"), token)
    .then(function(user){
        console.log("menu_user", user);
        var menu_basic= [
        '<li><a class="menu" href="' + amigable("module=home") +  '" data-tr="Home"></a></li>'+
        '<li><a class="menu" href="' + amigable("module=songs") +  '"data-tr="Songs"></a></li>'+
        '<li><a class="menu" href="' + amigable("module=contact") +  '" data-tr="Contact us"></a></li>'
        ];
        var menu="";
        if (user != null){
            if (user[0].type=="client"){
                menu_basic.push(
                    '<li><img src="'+user[0].avatar+'" alt="avatar" height="42" width="42"><a class="menu" href="#">'+user[0].username+'</a></li>',
                    '<li><a class="menu" id="logout" href="' + amigable("module=login&function=logout", true) +  '" data-tr="Log out"></a></li>'
                );
                for (var i=0;i<menu_basic.length;i++){
                    menu=menu+menu_basic[i];
                }                
                console.log("menu_client");
            }else{
                menu_basic.push(
                    '<li><img src="'+user[0].avatar+'" alt="avatar" height="42" width="42"><a class="menu" href="#">'+user[0].username+'</a></li>',
                    '<li><a class="menu" id="logout" href="' + amigable("module=login&function=logout", true) +  '" data-tr="Log out"></a></li>'
                );
                for (var i=0;i<menu_basic.length;i++){
                    menu=menu+menu_basic[i];
                }                
                console.log("menu admin");
            }

        }else{
            menu_basic.push(
                '<li><a class="menu" href="' + amigable("module=login") +  '" data-tr="Login"></a></li>'
            );
            for (var i=0;i<menu_basic.length;i++){
                menu=menu+menu_basic[i];
            }
            console.log("menu_guest");
        }
        $("#menu").html(
            '<ul>'+
                menu+
            '</ul>'
        )
        lang();
    })
}

function check_token(token){
    console.log(token);

    g_promise(amigable("module=login&function=check_token"), token)
    .then(function(data){
        console.log("data= " + data);
        if(data=="true"){
            print_menu();
        }
        else{
            console.log("token not same");
            localStorage.removeItem("id_token");
            window.location.href = amigable("module=login&function=logout");
        }

    })
}

$(document).ready(function() {
    var token = localStorage.getItem("id_token")
    console.log(token);
    console.log("menmu js");
    if(token){
        check_token(token);
    }else{
        print_menu();
    }
    // print_menu();


    $(document).on('click','#logout',function () {
        console.log("enter");
        localStorage.removeItem('id_token');
        localStorage.removeItem('token_data');
    })
    $("#btn-es").on("click", function(){
      lang('spanish');
    });
    $("#btn-en").on("click", function(){
      lang('english');
    });
    $("#btn-va").on("click", function(){
      lang('valencian');
    });
});