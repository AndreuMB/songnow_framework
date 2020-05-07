function pagination(){
    g_promise(amigable("module=songs&function=pagination"))
    .then(function(data){
        console.log("pagination");
        console.log(data);
        console.log(data[0].tsongs);
        var num_page;
        var show_songs=3;
        var total_pages=data[0].tsongs/show_songs;
        if ((data[0].tsongs%show_songs) !== 0){
            total_pages=total_pages+1;
        }
        var sql = "SELECT * FROM songs";
        pages(0, show_songs, sql);
        $("#pagination").bootpag({
            total: total_pages,
            page: num_page,
            maxVisible: 5,
            next: 'next',
            prev: 'prev'
        }).on("page", function (e, num) {
            console.log(num-1);
            num = num-1;
            pages(num, show_songs, sql);
            num_page=num;
        });
    })
}

function pages(page_now, show_songs, sql){
    console.log("page_now= " + page_now);
    // console.log("show_songs= " + show_songs);

    g_promise(amigable("module=songs&function=page"), page_now)
    .then(function(data){
        console.log("songs in this page= ");
        console.log(data);
        console.log(data.length);
        $('#songs').empty();
    
        var songs="";

        for(var i=0;i<data.length;i++){
            songs=songs+
            '<tr class="song" id=' + data[i].id_song + '>'+
                '<td>' + data[i].song_name + '</td>'+
                '<td>' + data[i].singer + '</td>'+
                '<td>' + data[i].album + '</td>'+
                '<td>' + data[i].duration + '</td>'+
            '</tr>'
        }
        console.log(songs);
        $("#songs").html(
            '<div class="map">'+
            '<img src="/songnow_framework/view/img/map.png" alt="map" id=map_img style="width:100%;">'+
            '<div class="centered" data-tr="See map"></div>'+
            '</div>'+
            '<table>'+
            '<tr>'+
            '<th>TITLE</th>'+
            '<th>ARTIST</th>'+
            '<th>ALBUM</th>'+
            '<th>DURATION</th>'+
            '</tr>'+
            songs+
            '</table>'
        )
    });
}

function sum_view(id){
    console.log("sum " + id);
    g_promise(amigable("module=songs&function=sum_view"), id)
    .then(function(data){
        console.log(data);
        console.log("WORK SUM");
    })
}

function filter(){
    g_promise(amigable("module=songs&function=categories"))
    .then(function(data){
        console.log("filters");
        console.log(data)
        $('#filters').empty();
        var img_categ=""
                         
        for(var i=0;i<data.length;i++){
            img_categ=img_categ+

            '<input type="checkbox" id="check' + [i] + '" value="' + data[i].id + '" class="chk">' + data[i].name + '</br>'

        }
        $("#filters").html(
            '<div class="fff">'+
            '<p>Categories</p>'+
            img_categ+
            '</div>'
        )
    })

    var checks="SELECT * FROM songs WHERE 0";
    var click = 0;
    console.log("checks=");
    $(document).on('click','.chk',function () {
        var id = this.getAttribute('id');
        var value = this.getAttribute('value');
        console.log(id);
        console.log(value);
        if (click==0){
            checks="SELECT * FROM songs WHERE 0"
        }
            if ($('#'+id).is(":checked")){
                console.log("CHECK");
                checks = checks + " OR playlists = '" + value + "'";
                click=click+1;
                console.log(click);
                console.log(checks);
            }else{
                console.log("NOT CHECK");
                checks = checks.replace(" OR playlists = '" + value + "'", "")
                click=click-1;
                console.log(click);
                console.log(checks);
                if (click==0){
                    checks="SELECT * FROM songs ORDER BY id_song ASC";
                }
            }
            send(checks);
    });
}

function send(data){
    var sql = "";
    sql=data;
    data2 = data.replace("*", "COUNT(*) tsongs")
    console.log(data);
    console.log(data2); //pas
    g_promise(amigable("module=songs&function=filter"), data2)
    .then(function(data){
        console.log("pagination");
        console.log("sql come here= ")
        console.log(sql);
        console.log(data);
        console.log(data[0].tsongs);
        var num_page;
        var show_songs=3;
        var total_pages=data[0].tsongs/show_songs;
        if ((data[0].tsongs%show_songs) !== 0){
            total_pages=total_pages+1;
        }
        pages(1, show_songs, sql);
        $("#pagination").bootpag({
            total: total_pages,
            page: num_page,
            maxVisible: 5,
            next: 'next',
            prev: 'prev'
        }).on("page", function (e, num) {
            console.log(num);
            pages(num, show_songs, sql);
            num_page=num;
        });
    });
}

function read(id){
    sum_view(id);
    console.log(id);
    console.log("carousel_jump");
    g_promise(amigable("module=songs&function=read"), id)
    .then(function(data){
        console.log("read")
        console.log(data);
        $('#api').empty();
        $('#songs').empty();
        $("#songs").html(

            '<h1>DETAILS</h1>'+
            '<div id="main-wrapper">'+
            '<div class="container">'+
                '<div class="row gtr-200">'+
                    '<div class="col-4 col-12-medium">'+
                            '<div id="sidebar">'+
                                '<section class="widget thumbnails">'+
                                    '<div class="grid">'+
                                        '<div class="row gtr-50">'+
                                            '<div class="col-6"><a href="#" class="image fit"><img class="prod_img" src="'+ data[0].rute +'" alt="" /></a></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</section>'+
                            '</div>'+
                    '</div>'+
                    '<div class="col-8 col-12-medium imp-medium">'+
                            '<div id="content">'+
                                '<section class="last">'+
                                    '<h2>'+ data[0].song_name +'</h2>'+
                                    '<ul><li>Singer:'+ data[0].singer +'</li>'+
                                    '<li>Album:'+ data[0].album +'</li>'+
                                    '<li>Relase date:'[0]+ data.relase_date +'</li>'+
                                    '<li>Genre:'+ data[0].genre +'</li>'+
                                    '<li>Duration:'+ data[0].duration +'</li></ul>'+
                                '</section>'+
                            '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'

            )
            // api_details(data.singer);
            localStorage.removeItem('carousel');
            localStorage.removeItem('id');

        })
        

}

function initMap() {
    $("#map").css({
        "color": "black", 
        "height": "700", 
        "width": "auto"
    });
    
     g_promise(amigable("module=songs&function=map"))
    .then(function(data){
        console.log(data);

        $('.container').empty();

        var markers = [];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(38.905081, -0.544696),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < data.length; i++) {

        var newMarker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].lat, data[i].lng),
            map: map,
            title: data[i].name
        });

        google.maps.event.addListener(newMarker, 'click', (function (newMarker, i) {
            return function () {
                infowindow.setContent(data[i].name);
                infowindow.open(map, newMarker);
            }
        })(newMarker, i));

        markers.push(newMarker);
    }

    })
}

function load(){

    var cat = localStorage.getItem('filter');
    var car = localStorage.getItem('carousel');

    if(cat){
        console.log("enter " + cat);
        ajaxForSearch(amigable("module=songs&function=cat"),cat)
    }else if(car){
        read(car);
    }else{
        pagination();
    }
   
}

function ajaxForSearch(durl, data) {
    console.log("come ajax");
    console.log(durl);

    g_promise(durl, data)
    .then(function(data){
        console.log("return ajax");
        console.log("filter=");
        console.log(data);

        $('#songs').empty();
 
        var img_categ=""
 
        
        for(var i=0;i<data.length;i++){
             img_categ=img_categ+
            '<tr class="song" id=' + data[i].id_song + '>'+
                '<td>' + data[i].song_name + '</td>'+
                '<td>' + data[i].singer + '</td>'+
                '<td>' + data[i].album + '</td>'+
                '<td>' + data[i].duration + '</td>'+
            '</tr>'
         }

         $("#songs").html(
            '<div class="map">'+
            '<img src="view/img/map.png" alt="map" id=map_img style="width:100%;">'+
            '<div class="centered" data-tr="See map"></div>'+
            '</div>'+
             '<table>'+
             '<tr>'+
                '<th>TITLE</th>'+
                '<th>ARTIST</th>'+
                '<th>ALBUM</th>'+
                '<th>DURATION</th>'+
             '</tr>'+
             img_categ+
             '</table>'
             )                  

         localStorage.removeItem('filter');
         localStorage.removeItem('genre');
         localStorage.removeItem('singer');
         

     })
    }

$(document).ready(function () {
    console.log("songs");
    load();
    filter();
    $('.songs_page').on('click','.song',function (e) {
        console.log(e.target);
        if (!$(e.target).is('.favorite')){
            var id = this.getAttribute('id');
            read(id);
        }
    })

    $(document).on('click','.map',function () {
        console.log("map");
        var script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + apikeygmaps + "&callback=initMap";
        script.async;
        script.defer;
        document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    });

})