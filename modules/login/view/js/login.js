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
                        '<input type="button" class="loginbtn" id="login_a" value="Social Login"/>'+
                    '</div>'+
                    '</form>'+
                '<span data-tr="Not have an account?"/> <a id="register" href="'+amigable("module=login")+'">Register</a>.<br>'+
                '<span data-tr="Forget password?"/><a id="fpsswd" href="'+amigable("module=login")+'">Click here</a>.'+
            '</div>'+
        '</div>'
    )
}

function fpsswd(){
    console.log("recover");
    $('#login').empty();
    $("#login").html(
        '<div class="row">'+
            '<div class="col-12 col-12-medium">'+
                '<form method="post" id="formpsswd">'+
                    '<div class="login">'+
                        '<h1>Login</h1>'+
                        '<label for="username"><b>Username</b></label>'+
                        '<input type="text" placeholder="Enter username" name="username" id="username" required>'+
                        '<p class="error" id="e_username"></p>'+
                        '<hr>'+
                        '<input type="submit" class="psswdbtn" value="Send"/>'+
                    '</div>'+
                    '</form>'+
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
    }else if(account=="fpsswd"){
        localStorage.removeItem('account');
        fpsswd();
    }else{
        localStorage.removeItem('account');
        login()
    }
    // var url = window.location.href;
    // console.log(url);
}

$(document).ready(function () {
    console.log("login");
    load();
    // viewpsswd();

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
            username0=data.split("=", 2);
            username1=username0[1].split("&", 1);
            console.log(username1[0]);

            g_promise(amigable("module=login&function=login"), data, false)
            .then(function(data){
                console.log(data);
                if(data != "true"){
                    window.alert(data);
                }else{
                    g_promise(amigable("module=login&function=token_login"), username1[0])
                    .then(function(data){
                        console.log(data);
                        localStorage.setItem('id_token', data);
                        window.alert("Log in successfully");
                        window.location.href = (amigable("module=home"));
                    })
                }

            })
    });
    $("#formpsswd").submit(function (e) {
		e.preventDefault();
            var data = $("#formpsswd").serialize();
            g_promise(amigable("module=login&function=fpsswd"), data, false)
            .then(function(data){
                console.log(data);
               
                g_promise(amigable("module=login&function=epsswd"), data)
                .then(function(data){
                    console.log(data);
                    window.alert("We send you an email recover");
                    check=true;
                    window.location.href = (amigable("module=login"));
                })

            }).catch(function(){
                console.log("error");
                $('#e_username').empty();
                $( '<span>Username not exist</span>' ).appendTo( "#e_username" );
            })
    });

    $(document).on('click','#register',function () {
        localStorage.setItem('account', "register_button");
        window.location.href = (amigable("module=login"));
    });
    $(document).on('click','#fpsswd',function () {
        localStorage.setItem('account', "fpsswd");
        window.location.href = (amigable("module=login"));
    });
    $(document).on('click','#login_a',function (e) {
        console.log("enter login_a");
        // e.preventDefault();
        webAuth.authorize();
        // setTimeout(function(){ getProfile(); }, 1000);
        // getProfile();
    });

    var userProfile;
    var content = $('.content');
    var loadingSpinner = $('#loading');
    content.css('display', 'block');
    loadingSpinner.css('display', 'none');
  
    var webAuth = new auth0.WebAuth({
        domain: 'dawv2.auth0.com',
        clientID: 'D6vc09qkv89eUBFBUDgCQD4jPkAoQ62v',
        redirectUri: "http://localhost/songnow_framework/login",
        audience: 'https://' + 'dawv2.auth0.com' + '/userinfo',
        responseType: 'token id_token',
        scope: 'openid profile email',
        leeway: 60
      });
  
    // var loginStatus = $('.container h4');
    // var loginView = $('#login-view');
    // var homeView = $('#home-view');
    // var profileView = $('#profile-view');
  
    // buttons and event listeners
    var loginBtn = $('#btn-login');
    var logoutBtn = $('#btn-logout');
    // var homeViewBtn = $('#btn-home-view');
    var profileViewBtn = $('#btn-profile-view');
  
  
    function setSession(authResult) {
      // Set the time that the access token will expire at
      localStorage.setItem('id_token', authResult.idToken);
      getProfile(authResult);
    }
  
 
    function isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
  
    // function displayButtons() {
    //   var loginStatus = $('.container h4');
    //   if (isAuthenticated()) {
    //     loginBtn.css('display', 'none');
    //     logoutBtn.css('display', 'inline-block');
    //     profileViewBtn.css('display', 'inline-block');
    //     loginStatus.text(
    //       'You are logged in! You can now view your profile area.'
    //     );
    //   } else {
    //     homeView.css('display', 'inline-block');
    //     loginBtn.css('display', 'inline-block');
    //     logoutBtn.css('display', 'none');
    //     profileViewBtn.css('display', 'none');
    //     profileView.css('display', 'none');
    //     loginStatus.text('You are not logged in! Please log in to continue.');
    //   }
    // }
  
    function getProfile(authResult) {
 
        webAuth.client.userInfo(authResult.accessToken, function(err, profile) {
        // console.log(profile);
          if (profile) {
            g_promise(amigable("module=login&function=login_a"), profile)
            .then(function(data){
                console.log(data);
                localStorage.setItem('token_data', data);
                window.location.href = (amigable("module=home"));
            }).catch(function (){
                console.log("error");
            })
          }
        });
      
    //   else {
    //     displayProfile();
    //   }
    }
  
    function handleAuthentication() {
      webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          setSession(authResult);
        //   loginBtn.css('display', 'none');
        //   homeView.css('display', 'inline-block');
        // } else if (err) {
        //   homeView.css('display', 'inline-block');
        //   console.log(err);
        //   alert('Error: ' + err.error + '. Check the console for further details.');
        }else{
            console.log("not loged");
        }
        // displayButtons();
      });
    }
    handleAuthentication();


});