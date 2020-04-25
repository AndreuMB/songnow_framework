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

	$(document).on('click','#send',function(){
		result = true;
		$(".error").remove();

		var rname = /^[a-zA-Z]+[\-'\s]?[a-zA-Z]{2,51}$/;
		var remail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		var rmessage = /^.{10,100}$/;
		var form = [];

		if ($("#name").val() === ""){
			$("#name").focus().after("<span class='error'>Introduce tu nombre</span>");
			result=false;
		}else if(!rname.test($("#name").val())){
			$("#name").focus().after("<span class='error'>Introduce un nombre valido</span>");
			result=false;
		}else{
			form.push($("#name").val());
		}

		if ($("#email").val() === ""){
			$("#email").after("<span class='error'>Introduce tu email</span>");
			if (result) {
				$("#email").focus();
				result=false;
			}
		}else if(!remail.test($("#email").val())){
			$("#email").after("<span class='error'>Introduce un email valido</span>");
			if (result) {
				$("#email").focus();
				result=false;
			}
		}else{
			form.push($("#email").val());
		}

		if ($("#message").val() === ""){
			$("#message").after("<span class='error'>Introduce tu mensaje</span>");
			if (result) {
				$("#message").focus();
				result=false;
			}
		}else if(!rmessage.test($("#message").val())){
			$("#message").after("<span class='error'>Introduce un mensaje con almenos 10 caracteres</span>");
			if (result) {
				$("#message").focus();
				result=false;
			}
		}else{
			form.push($("#message").val());
		}

		if (result) {
			console.log(form);
			g_promise(amigable("module=contact&function=send_email"), form)
			.then(function(data){
				console.log(data);
				document.getElementById("form").reset();
				toastr["success"]("Your email has been sent");
			}).catch(function(){
				console.log("error");
				toastr["error"]("An error has ocurred. Please try again");
			})
			// $('#send_contact').attr('disabled', true);
			// $('.ajaxLoader').fadeIn("fast");
			// var data = {"cname":$("#cname").val(),"cemail":$("#cemail").val(),"matter":$("#matter").val(),"message":$("#message").val()};
			// var fin_data = JSON.stringify(data);
			// $.post(amigable("?module=contact&function=send_cont"),{"fin_data":fin_data},function(data,event){
			// 	$('.ajaxLoader').fadeOut("fast");
			// 	console.log(data);
			// 	$("#rltsendmessage").html(data).fadeIn("slow");
                    
			//     setTimeout(function() {
			//         $("#rltsendmessage").fadeOut("slow")
			//     }, 5000);
			// });
		}
	});

});