<?php
    class controller_profile{

        function list_profile(){
            require(VIEW_PATH_TOP . "top_" . $_GET['module'] . ".html");
            require(VIEW_PATH_INC . "menu.html");
            loadView(HTML_PROFILE, $_GET['module'] . '.html');
            require(VIEW_PATH_INC . "footer.html");
        }

        function c_user(){
            $json=loadModel(MODEL_PROFILE, "profile_model", "c_user", $_POST['p_data']);
            echo json_encode($json);
        }

    }
?>