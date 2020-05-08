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

    }
?>