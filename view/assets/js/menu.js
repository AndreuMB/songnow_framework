function print_menu(){
    $("#menu").html(
        '<ul>'+
            '<li><a class="menu" href="' + amigable("module=home") +  '" data-tr="Home"></a></li>'+
            '<li><a class="menu" href="' + amigable("module=songs") +  '"data-tr="Songs"></a></li>'+
            '<li><a class="menu" href="' + amigable("module=contact") +  '" data-tr="Contact us"></a></li>'+
        '</ul>'
    )
}
$(document).ready(function() {
    console.log("menmu js");
    print_menu();
})