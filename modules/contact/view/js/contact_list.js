function initMap() {
	var ontinyent = {lat: 38.8220593, lng: -0.6063927};
	var map = new google.maps.Map(document.getElementById('map2'), {
	  zoom: 10,
	  center: ontinyent
	});
	var contentString = '<div id="content">'+
	'<div id="siteNotice">'+
	'</div>'+
	'<h1 id="firstHeading" class="firstHeading">IES ESTACIO</h1>'+
	'<div id="bodyContent">'+
	'<p><b>Ontinyent</b>'+
	'<p><b> IES LESTACIÓ</b>, <a href="http://www.iestacio.com/</a> '+
	'(last visited June 22, 2019).</p>'+
	'</div>'+
	'</div>';
  
	var infowindow = new google.maps.InfoWindow({
	  content: contentString
	});
  
	var marker = new google.maps.Marker({
	  position: ontinyent,
	  map: map,
	  title: 'Ontinyent'
	});
	marker.addListener('click', function() {
	  infowindow.open(map, marker);
	});
}
$(document).ready(function(){
	// $('.ajaxLoader').fadeOut("fast");
	console.log("map");
	if(document.getElementById("map2") != null){
	  var script = document.createElement('script');
	  script.src = "https://maps.googleapis.com/maps/api/js?key=" + apikeygmaps + "&callback=initMap";
	  script.async;
	  script.defer;
	  document.getElementsByTagName('script')[0].parentNode.appendChild(script);
	}

	$(document).on('click','#send_contact',function(){
		result = true;
		$(".error").remove();

		var pname = /^[a-zA-Z]+[\-'\s]?[a-zA-Z]{2,51}$/;
	    var pmessage = /^[0-9A-Za-z\s]{20,100}$/;
    	var pmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if ($("#cname").val() === "" || $("#cname").val() === "Introduce tu nombre" ) {
			$("#cname").focus().after("<span class='error'>Introduce tu nombre</span>");
			return false;
		}else if (!pname.test($("#cname").val())) {
			$("#cname").focus().after("<span class='error'>El nombre tiene un minimo de 3 caracteres</span>");
			return false;
		}
		if ($("#cemail").val() === "" || $("#cemail").val() === "Introduce tu email" ) {
			$("#cemail").focus().after("<span class='error'>Introduce tu email</span>");
			return false;
		}else if (!pmail.test($("#cemail").val())) {
			$("#cemail").focus().after("<span class='error'>El formato del mail es incorrecto</span>");
			return false;
		}
		if ($("#matter").val() === "Seleccione un asunto" ) {
			$("#matter").focus().after("<span class='error'>Seleccione un asunto</span>");
			return false;
		}
		if ($("#message").val() === "" || $("#message").val() === "Seleccione un asunto" ) {
			$("#message").focus().after("<span class='error'>Introduzca su mensaje</span>");
			return false;
		}else if (!pmessage.test($("#message").val())) {
			$("#message").focus().after("<span class='error'>El mensaje tiene un minimo de 20 caracteres</span>");
			return false;
		}
		
		if (result) {
			$('#send_contact').attr('disabled', true);
			$('.ajaxLoader').fadeIn("fast");
			var data = {"cname":$("#cname").val(),"cemail":$("#cemail").val(),"matter":$("#matter").val(),"message":$("#message").val()};
			var fin_data = JSON.stringify(data);
			$.post(amigable("?module=contact&function=send_cont"),{"fin_data":fin_data},function(data,event){
				$('.ajaxLoader').fadeOut("fast");
				console.log(data);
				$("#rltsendmessage").html(data).fadeIn("slow");
                    
			    setTimeout(function() {
			        $("#rltsendmessage").fadeOut("slow")
			    }, 5000);
			});
		}
	});

});