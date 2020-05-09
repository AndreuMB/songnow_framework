<?php
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
        function menu(){
            if(isset($_SESSION['type'])){
                $data = array(
                    "username"=>$_SESSION['username'],
                    "avatar"=>$_SESSION['avatar'],
                    "type"=>$_SESSION['type']
                );
                echo json_encode($data);
            }else{
                echo json_encode(null);
            }
        }

        function logout(){
            session_destroy();
            header('Location: ' . amigable('module=login', true));
        }

    }
?>