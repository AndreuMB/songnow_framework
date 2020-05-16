<?php
    class controller_shop{

        function list_shop(){
            require(VIEW_PATH_TOP . "top_" . $_GET['module'] . ".html");
            require(VIEW_PATH_INC . "menu.html");
            loadView(HTML_SHOP, $_GET['module'] . ".html");
            require(VIEW_PATH_INC . "footer.html");
        }

        function products(){
            $json = loadModel(MODEL_SHOP, "shop_model", "products");
            echo json_encode($json);
        }
        function read(){
            $json = loadModel(MODEL_SHOP, "shop_model", "read", $_POST['p_data']);
            echo json_encode($json);
        }

    }
?>