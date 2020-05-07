<?php
    class controller_home{

        function list_home(){
            require(VIEW_PATH_TOP . "top_" . $_GET['module'] . ".php");
            require(VIEW_PATH_INC . "menu.php");
            loadView(HTML_HOME, 'home.html');
            require(VIEW_PATH_INC . "footer.html");
        }

        function carousel(){
            $json = loadModel(MODEL_HOME, "home_model", "carousel");
            echo json_encode($json);
        }

        function categories(){
            // echo json_encode("json");
            $page					=	intval($_POST['p_data']);
            $current_page			=	$page;
            $records_per_page		=	3; // records to show per page
            $start					=	$current_page * $records_per_page;
            $json = loadModel(MODEL_HOME, "home_model", "categories", $start);
            echo json_encode($json);
        }
        function sum_view_song(){
            $json = loadModel(MODEL_HOME, "home_model", "sum_view_song", $_POST['p_data']);
            echo json_encode($json);
        }
        function sum_view_categ(){
            $json = loadModel(MODEL_HOME, "home_model", "sum_view_categ", $_POST['p_data']);
            echo json_encode($json);
        }

    }
?>