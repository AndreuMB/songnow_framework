<?php
    class controller_songs{

        function list_songs(){
            require(VIEW_PATH_TOP . "top_" . $_GET['module'] . ".php");
            require(VIEW_PATH_INC . "menu.php");
            loadView(HTML_SONGS, 'songs.html');
            require(VIEW_PATH_INC . "footer.html");
        }

        function pagination(){
            $json = loadModel(MODEL_SONGS, "songs_model", "pagination");
            echo json_encode($json);
        }

        function page(){
            // echo json_encode("5");
            $page					=	intval($_POST['p_data']);
            $current_page			=	$page;
            $records_per_page		=	3; // records to show per page
            $start					=	$current_page * $records_per_page;

            
            $json = loadModel(MODEL_SONGS, "songs_model", "page", $start);
            echo json_encode($json);
        }
        function categories(){
            $json = loadModel(MODEL_SONGS, "songs_model", "categories");
            echo json_encode($json);
        }
        function filter(){
            $json = loadModel(MODEL_SONGS, "songs_model", "filter", $_POST['p_data']);
            echo json_encode($json);
        }
        function read(){
            $json = loadModel(MODEL_SONGS, "songs_model", "read", $_POST['p_data']);
            echo json_encode($json);
        }
        function sum_view(){
            $json = loadModel(MODEL_SONGS, "songs_model", "sum_view", $_POST['p_data']);
            echo json_encode($json);
        }
        function map(){
            $json = loadModel(MODEL_SONGS, "songs_model", "map");
            echo json_encode($json);
        }
        function cat(){
            $json = loadModel(MODEL_SONGS, "songs_model", "cat", $_POST['p_data']);
            echo json_encode($json);
        }

    }
?>