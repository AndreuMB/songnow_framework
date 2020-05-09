function lang(lang) {
    // Save preferences
    lang = lang || localStorage.getItem('app-lang') || 'english';
    localStorage.setItem('app-lang', lang);
  
    var allang = document.querySelectorAll('[data-tr]');
  
    $.ajax({
        // url: '../../../view/langs/' + lang + '.json',
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
    g_promise(amigable("module=login&function=menu"))
    .then(function(data){
        console.log("data menu");
        console.log(data)
        var menu_basic= [
        '<li><a class="menu" href="' + amigable("module=home") +  '" data-tr="Home"></a></li>'+
        '<li><a class="menu" href="' + amigable("module=songs") +  '"data-tr="Songs"></a></li>'+
        '<li><a class="menu" href="' + amigable("module=contact") +  '" data-tr="Contact us"></a></li>'
        ];
        var menu="";
        if (data != null){
            if (data.type=="client"){
                menu_basic.push(
                    '<li><img src="'+data.avatar+'" alt="avatar" height="42" width="42"><a class="menu" href="#">'+data.username+'</a></li>',
                    '<li><a class="menu" href="' + amigable("module=login&function=logout", true) +  '" data-tr="Log out"></a></li>'
                );
                for (var i=0;i<menu_basic.length;i++){
                    menu=menu+menu_basic[i];
                }                
                console.log("menu_client");
                // $("#menu").html(
                //     '<nav id="nav">'+
                //         '<ul>'+
                //         menu+
                //         '</ul>'+
                //     '</nav>'
                // )
            }else{
                menu_basic.push(
                    '<li><img src="'+data.avatar+'" alt="avatar" height="42" width="42"><a class="menu" href="#">'+data.username+'</a></li>',
                    '<li><a class="menu" href="' + amigable("module=login&function=logout", true) +  '" data-tr="Log out"></a></li>'
                );
                for (var i=0;i<menu_basic.length;i++){
                    menu=menu+menu_basic[i];
                }                
                console.log("menu admin");
                // $("#menu").html(
                //     '<nav id="nav">'+
                //         '<ul>'+
                //         menu+ 
                //         '</ul>'+
                //     '</nav>'
                // )
            }

        }else{
            menu_basic.push(
                '<li><a class="menu" href="' + amigable("module=login") +  '" data-tr="Login"></a></li>'
            );
            for (var i=0;i<menu_basic.length;i++){
                menu=menu+menu_basic[i];
            }
            console.log("menu_guest");
            // $("#menu").html(
            //     '<nav id="nav">'+
            //         '<ul>'+
            //         menu+
            //         '</ul>'+
            //     '</nav>'
            // )
        }
        console.log(menu);
        $("#menu").html(
            '<ul>'+
                menu+
            '</ul>'
        )
        lang();
    })
}

$(document).ready(function() {
    console.log("menmu js");
    print_menu();

    $("#btn-es").on("click", function(){
      lang('spanish');
    });
    $("#btn-en").on("click", function(){
      lang('english');
    });
    $("#btn-va").on("click", function(){
      lang('valencian');
    });
    // $(document).on('click','.menu',function () {
    // console.log("come here menu");
    // var id = this.getAttribute('id');
    // console.log(id);
    // });

});