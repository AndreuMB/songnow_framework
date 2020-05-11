<?php
    require_once "JWT_token.php";
    class controller_login{
        function list_login(){
            require(VIEW_PATH_TOP . "top_" . $_GET['module'] . ".html");
            require(VIEW_PATH_INC . "menu.html");
            loadView(HTML_LOGIN,  $_GET['module'] . '.html');
            require(VIEW_PATH_INC . "footer.html");
        }
        function register(){
            $data = array(
                "username" => $_POST['username'],
                "email" => $_POST['email'],
                "psswd" => $_POST['psswd']
            );

            $return = loadModel(MODEL_LOGIN, "login_model", "register", $data);
            $data = array(
                "username" => $_POST['username'],
                "email" => $_POST['email'],
                "psswd" => $_POST['psswd'],
                "type" => "register",
                "token" => $return['token']
            );
            if ($return['work']){
                email($data);
            }else{
                echo "error";
            }
            
            echo json_encode("done");
        }
        function activate(){
            loadModel(MODEL_LOGIN, "login_model", "activate", $_GET['token']);
            header('Location: ' . amigable('module=login', true));
        }
        function login(){
            $user=loadModel(MODEL_LOGIN, "login_model", "login", $_POST['username']);
            // echo json_encode($user);

            if (!$user){
                echo json_encode("the username not exists");
            }else{
                if (password_verify($_POST['psswd'],$user[0]['psswd'])) {
                    if ($user[0]['active']=="1"){
                        $_SESSION['username'] = $user[0]['username'];
                        $_SESSION['avatar'] = $user[0]['avatar'];
                        $_SESSION['type'] = $user[0]['type'];
                        echo json_encode("true");
                    }else{
                        echo json_encode("first activate your account");
                    }
                }else{
                    echo json_encode("username or password incorrects");
                }
            }
        }

        function login_a(){
            $result=loadModel(MODEL_LOGIN, "login_model", "login_a", $_POST['p_data']);
            $token=encode_token($_POST['p_data']['sub']);
            // $_SESSION['username'] = $_POST['p_data']['nickname'];
            // $_SESSION['avatar'] = $_POST['p_data']['picture'];
            // $_SESSION['type'] = "client";
            echo json_encode($token);
        }

        function menu(){
            if(isset($_SESSION['type'])){
                $data = array(
                    "username"=>$_SESSION['username'],
                    "avatar"=>$_SESSION['avatar'],
                    "type"=>$_SESSION['type']
                );
                echo json_encode($data);
            }elseif(!empty($_POST['p_data'])){
                $token=decode_token($_POST['p_data']);
                $name=json_decode($token)->name;
                $data=loadModel(MODEL_LOGIN, "login_model", "id_user", $name);
                echo json_encode($data);
            }else{
                echo json_encode(null);
            }
        }

        function logout(){
            session_destroy();
            header('Location: ' . amigable('module=login', true));
        }

        function token_login(){
            $username=$_POST['p_data'];
            $token=encode_token($username);
            $_SESSION['token'] = $token;
            $data = array (
                "username" => $username,
                "token" => $token
            );
            loadModel(MODEL_LOGIN, "login_model", "save_token", $data);
            echo json_encode($token);
        }

        function check_token(){
            // echo json_encode($_POST['p_data']);
            $token=loadModel(MODEL_LOGIN, "login_model", "token", $_POST['p_data']);
            if ($token){
                 echo json_encode("true");
            }else{
                echo json_encode("false");
            }
        }
        function fpsswd(){
            $exist=loadModel(MODEL_LOGIN, "login_model", "fpsswd", $_POST['username']);

            if($exist){
                echo json_encode($exist);
            }else{
                echo "error";
            }
        }
        function epsswd(){
            // echo json_encode($_POST['p_data']);
            $data = array(
                "username" => $_POST['p_data'][0]['idusers'],
                "email" => $_POST['p_data'][0]['email'],
                "type" => "psswd",
                "token" => $_POST['p_data'][0]['token']
            );
            email($data);

            echo json_encode("done");
        }
        function cpsswd(){
            $_SESSION['tokenp']=$_GET['token'];
            require(VIEW_PATH_TOP . "top_rpsswd.html");
            require(VIEW_PATH_INC . "menu.html");
            loadView(HTML_LOGIN,  $_GET['module'] . '.html');
            require(VIEW_PATH_INC . "footer.html");
        }
        function rpsswd(){
            $data = array(
                "token" => $_SESSION['tokenp'],
                "psswd" => $_POST['psswd'],
            );
            loadModel(MODEL_LOGIN, "login_model", "rpsswd", $data);
            echo json_encode("done");
        }
    }
?>