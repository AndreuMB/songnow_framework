function carousel() {
    
    $("#carousel-example").on("slide.bs.carousel", function (e) {
        /*
        CC 2.0 License Iatek LLC 2018 – Attribution required
        */
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 4;
        var totalItems = $(".carousel-item").length;
        
        if (idx >= totalItems-(itemsPerSlide-1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i=0; i<it; i++) {
                // append slides to end
                if (e.direction=="left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $(".carousel-item").eq(0).appendTo(".carousel-inner");
                }
            }
        }
    });
    
    g_promise(amigable("module=home&function=carousel"))
    .then(function(data){
        console.log("carousel");
        console.log(data);
        $('#carousel-example').empty();
        // $('<div></div>').attr('id','Div1').appendTo('#carousel-example');
                    //  $('<div></div>').attr('id','Div2').appendTo('#modalcontent');
                    //  $('<div></div>').attr('id','preciocasa').appendTo('#modalcontent');
                    
                        var string_car=""

                            
                    for(var i=0;i<data.length;i++){
                        if(i==0){
                            console.log("0")
                            string_car= string_car +
                            '<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 active">'+
                                '<img src="' + data[i].rute + '" id="' + data[i].id_song + '" class="img-fluid mx-auto d-block img_car" alt="img' + data[i].id + '">'+
                            '</div>'
                        }else{
                            console.log("1")
                            string_car= string_car +
                            '<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">'+
                                '<img src="' + data[i].rute + '" id="' + data[i].id_song + '" class="img-fluid mx-auto d-block img_car" alt="img' + data[i].id + '">'+
                            '</div>'
                            // console.log(string_car)
                        }
                    }
                        $("#carousel-example").html(
                        '<div class="carousel-inner row w-100 mx-auto" role="listbox">'+
                            string_car+
                    '</div>'+
                        '<a class="carousel-control-prev" href="#carousel-example" role="button" data-slide="prev">'+
                        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                        '<span class="sr-only">Previous</span>'+
                    '</a>'+
                    '<a class="carousel-control-next" href="#carousel-example" role="button" data-slide="next">'+
                        '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                        '<span class="sr-only">Next</span>'+
                    '</a>'
                    )
    }).catch(function(){
        console.log("error");
        // toastr["error"]("An error has ocurred. Please try again");
    })
}

function categories(){
    var current_page	=	1;
    var loading			=	false;
    var oldscroll		=	0;
    scroll(current_page);
    current_page = current_page + 1;
    $(window).scroll(function() {
		if( $(window).scrollTop() > oldscroll ){ //if we are scrolling down
			if( ($(window).scrollTop() + $(window).height() >= $(document).height()  ) ) {
                    scroll(current_page);
                    current_page = current_page + 1;
			}
		}
	});
}

function scroll(current_page){
    console.log("categories1");
    g_promise(amigable("module=home&function=categories"),current_page)
    .then(function(data){
        console.log("categories");
        console.log(data)

        var img_categ=""
        // var title_categ = ["POPULAR MUSIC", "POPULAR MUSIC SPAIN", "RECOMMEND FOR YOU"]; 

                         
        for(var i=0;i<data.length;i++){
            img_categ=img_categ+
        '<div class="col-4 col-12-medium">'+


            '<section class="box feature">'+
                '<a class="image featured"><img src="' + data[i].rute + '" class="categ_img" id=' + data[i].id + ' alt="" /></a>'+
                '<div class="inner">'+
                    '<header>'+
                        '<h2 data-tr="">' + data[i].name + '</h2>'+
                    '</header>'+
                '</div>'+
            '</section>'+

        '</div>'

        }
        $("#categories").html(
            img_categ
        )
    })

}

function categ_shop(id){
    g_promise(amigable("module=home&function=sum_view_categ"),id)
    .then(function(data){
        localStorage.setItem('filter', id);
        window.location.href = amigable("module=songs");
    })
}

function carousel_details(id){
    g_promise(amigable("module=home&function=sum_view_song"),id)
    .then(function(data){
        localStorage.setItem('carousel', id);
        window.location.href = amigable("module=songs");
    })


}

function api(){
    console.log("api");
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=freddie mercury",
    function(data){
        $("#images").empty();
        console.log("api_enter");
        console.log(data)
        var img_categ=""                         
        for(var i=0;i<3;i++){
            img_categ=img_categ+
        '<div class="col-4 col-12-medium">'+
            '<section class="box feature">'+
                '<a class="image featured"><img src="' + data.items[i].volumeInfo.imageLinks.thumbnail + '" class="related" id=' + data.items[i].volumeInfo.previewLink + ' alt="" /></a>'+
                '<div class="inner">'+
                    '<header>'+
                        '<h2 data-tr="">' + data.items[i].volumeInfo.title + '</h2>'+
                    '</header>'+
                '</div>'+
            '</section>'+

        '</div>'

        }
        $("#api").html(
            img_categ
        )
    });
}

$(document).ready(function () {
    console.log("shome");
    carousel();
    categories();
    // api();
    $(document).on('click','.categ_img',function () {
        var id = this.getAttribute('id');
        console.log(id);
        categ_shop(id);
    });
    // $(document).on('click','.related',function () {
    //     var id = this.getAttribute('id');
    //     console.log(id);
    //     window.location.href = id;
    // });
    $(document).on('click','.img_car',function () {
        var id = this.getAttribute('id');
        console.log(id);
        carousel_details(id);
    });
    // $(document).on('click','.account',function () {
    //     var id = this.getAttribute('id');
    //     console.log(id);
    //     account(id);
    // });
});