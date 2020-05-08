function validationR(){
    console.log("validation");

    function validate_username(username) {
        if (username.length > 0) {
            var regexp = /^[a-zA-Z0-9]*$/;
            return regexp.test(username);
        }
        return false;
    }
    function validate_email(email) {
        if (email.length > 0) {
            var regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regexp.test(email);
        }
        return false;
    }
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

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var psswd = document.getElementById('psswd').value;
    var psswd2 = document.getElementById('psswd2').value;

    var v_username = validate_username(username);
    var v_email = validate_email(email);
    var v_psswd = validate_psswd(psswd);
    var v_psswd2 = validate_psswd2(psswd2,psswd);

    if (!v_username) {
        document.getElementById('e_username').innerHTML = "The introduced name is not valid (use only numbres and letters)";
        return 0;
    }else{
        document.getElementById('e_username').innerHTML = "";
    };
    if (!v_email) {
        document.getElementById('e_email').innerHTML = "The introduced email is not valid (example@example.com)";
        return 0;
    }else{
        document.getElementById('e_email').innerHTML = "";
    };
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

function register(){
    console.log("register");
    $('#login').empty();
    $("#login").html(
        '<div class="row">'+
            '<div class="col-12 col-12-medium">'+
                '<form method="post" id="formregister">'+
                    '<div class="register">'+
                        '<h1>Register</h1>'+
                        '<label for="username"><b>Username</b></label>'+
                        '<input type="text" placeholder="Enter Username" name="username" id="username" required>'+
                        '<p class="error" id="e_username"></p>'+
                        '<label for="email"><b>Email</b></label>'+
                        '<input type="text" placeholder="Enter Email" name="email" id="email" required>'+
                        '<p class="error" id="e_email"></p>'+
                        '<label for="psswd"><b>Password</b></label>'+
                        '<input type="password" placeholder="Enter Password" name="psswd" id="psswd" required>'+
                        '<p class="error" id="e_psswd"></p>'+
                        '<label for="psswd2"><b>Repeat Password</b></label>'+
                        '<input type="password" placeholder="Repeat Password" name="psswd2" id="psswd2" required>'+
                        '<p class="error" id="e_psswd2"></p>'+
                        '<hr>'+
                        '<input type="submit" class="registerbtn" value="Register"/>'+
                    '</div>'+
                    '</form>'+
                '<p>Already have an account? <a href="'+amigable("module=login")+'">Log in</a>.</p>'+
            '</div>'+
        '</div>'
    )
    $(document).on('click','.registerbtn',function () {
        validationR();
    });
}

function login(){
    console.log("login");
    $('#login').empty();
    $("#login").html(
        '<div class="row">'+
            '<div class="col-12 col-12-medium">'+
                '<form method="post" id="formlogin">'+
                    '<div class="login">'+
                        '<h1>Login</h1>'+
                        '<label for="username"><b>Username</b></label>'+
                        '<input type="text" placeholder="Enter Username" name="username" required>'+
                        '<label for="psswd"><b>Password</b></label>'+
                        '<input type="password" placeholder="Enter Password" name="psswd" required>'+
                        '<hr>'+
                        '<input type="submit" class="loginbtn" value="Login"/>'+
                    '</div>'+
                    '</form>'+
                '<p>Not have an account? <a id="register" href="'+amigable("module=login")+'">Register</a>.</p>'+
            '</div>'+
        '</div>'
    )
}

function load(){

    var account = localStorage.getItem('account');
    console.log(account);
    if (account=="register_button"){
        localStorage.removeItem('account');
        register();
    }else{
        localStorage.removeItem('account');
        login()
    }
}

$(document).ready(function () {
    console.log("login");
    load();
    $("#formregister").submit(function (e) {
		e.preventDefault();
		if(validationR() != 0){
            var data = $("#formregister").serialize();
            console.log(data);
            g_promise(amigable("module=login&function=register"), data, false)
            .then(function(data){
                console.log(data);
                window.alert("We send you an email for activate account");
                window.location.href = (amigable("module=login"));
            }).catch(function(){
                document.getElementById('e_username').innerHTML = "The introduced name exist";
            })
        }
    });
    $("#formlogin").submit(function (e) {
		e.preventDefault();
            var data = $("#formlogin").serialize();
            console.log(data);
            $.ajax({
                type : 'GET',
                url  : 'module/login/controller/controller_login.php?&op=login&' + data,
            })
            .done(function(data) {
                console.log(data);
                if(data != "true"){
                    window.alert(data);
                }else{
                    window.alert("Log in successfully");
                    if(localStorage.getItem("buy") === null){
                        console.log("CART NOT EXIST");
                        window.location.href = 'index.php?page=controller_home&op=list';
                    }else{
                        console.log("CART EXIST");
                        localStorage.removeItem("buy");
                        window.location.href = 'index.php?page=controller_cart&op=list';
                    }
                }

            })
    });
    $(document).on('click','#register',function () {
        localStorage.setItem('account', "register_button");
        window.location.href = 'index.php?page=controller_login&op=list';
    });
});