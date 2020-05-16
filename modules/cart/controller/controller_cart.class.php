<?php
    class controller_cart{

        function list_cart(){
            require(VIEW_PATH_TOP . "top_" . $_GET['module'] . ".html");
            require(VIEW_PATH_INC . "menu.html");
            loadView(HTML_CART, $_GET['module'] . ".html");
            require(VIEW_PATH_INC . "footer.html");
        }

        function products(){
            $json = loadModel(MODEL_CART, "cart_model", "products");
            echo json_encode($json);
        }
        function id_purchase(){
            $json = loadModel(MODEL_CART, "cart_model", "id_purchase");
            echo json_encode($json);
        }
        function buy(){
            $json = loadModel(MODEL_CART, "cart_model", "buy", $_POST['p_data']);
            echo json_encode($json);
        }

    }
?>