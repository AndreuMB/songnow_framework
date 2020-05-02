<?php
    class controller_home {
        function list_home(){
            require(VIEW_PATH_TOP . "top_" . $_GET['module'] . ".php");
            require(VIEW_PATH_INC . "header.php");
            require(VIEW_PATH_INC . "menu.php");
            loadView(HTML_HOME, 'home.html');
            require(VIEW_PATH_INC . "footer.html");
        }

        function carousel(){
            // echo json_encode(MODEL_HOME);
            $json = loadModel(MODEL_HOME, "home_model", "carousel");
            echo json_encode($json);
        }
    }
?>