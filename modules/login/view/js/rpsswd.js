function validationC(){
    console.log("validationC");

    function validate_psswd(psswd) {
        if (psswd.length > 0) {
            var regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
            return regexp.test(psswd);
        }
        return false;
    }

    function validate_psswd2(psswd2,psswd) {
        if (psswd2==psswd){
            return true;
        }else{
            return false;
        }
    }

    var psswd = document.getElementById('psswd').value;
    var psswd2 = document.getElementById('psswd2').value;

    var v_psswd = validate_psswd(psswd);
    var v_psswd2 = validate_psswd2(psswd2,psswd);

    if (!v_psswd) {
        document.getElementById('e_psswd').innerHTML = "The password need contain uppercase, lowecase and numbers";
        return 0;
    }else{
        document.getElementById('e_psswd').innerHTML = "";
    };
    if (!v_psswd2) {
        document.getElementById('e_psswd2').innerHTML = "The password not is the same";
        return 0;
    }else{
        document.getElementById('e_psswd2').innerHTML = "";
    };
}

function viewpsswd(){
    console.log("cpsswd");
    $('#login').empty();
    $("#login").html(
        '<div class="row">'+
            '<div class="col-12 col-12-medium">'+
                '<form method="post" id="formcpsswd">'+
                    '<div class="register">'+
                        '<h1>Change password</h1>'+
                        '<label for="psswd"><b>Password</b></label>'+
                        '<input type="password" placeholder="Enter Password" name="psswd" id="psswd" required>'+
                        '<p class="error" id="e_psswd"></p>'+
                        '<label for="psswd2"><b>Repeat Password</b></label>'+
                        '<input type="password" placeholder="Repeat Password" name="psswd2" id="psswd2" required>'+
                        '<p class="error" id="e_psswd2"></p>'+
                        '<hr>'+
                        '<input type="submit" class="psswdc" value="Change"/>'+
                    '</div>'+
                    '</form>'+
            '</div>'+
        '</div>'
    )
    $(document).on('click','.psswdc',function () {
        console.log("enterc");
        validationC();
    });
}

$(document).ready(function () {
    console.log("psswd");
    viewpsswd();

    $("#formcpsswd").submit(function (e) {
		e.preventDefault();
		if(validationC() != 0){
            // console.log("eneter");
            var data = $("#formcpsswd").serialize();
            console.log(data);
            g_promise(amigable("module=login&function=rpsswd"), data, false)
            .then(function(data){
                console.log(data);
                window.alert("We change your password");
                window.location.href = (amigable("module=login"));
            })
        }
    });

});