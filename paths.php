<?php
    define('PROJECT', '/songnow_framework/');

    //SITE_ROOT
    define('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . PROJECT);
    
    //SITE_PATH
    define('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . PROJECT);

    //CSS
    define('CSS_PATH', SITE_PATH . 'view/css/');
    
    //JS
    define('JS_PATH', SITE_PATH . 'view/js/');
    
    //IMG
    define('IMG_PATH', SITE_PATH . 'view/img/');

    //MODEL
    define('MODEL_PATH', SITE_ROOT . 'model/');
    
    //MODULES
    define('MODULES_PATH', SITE_ROOT . 'modules/');
    
    //VIEW
    define('VIEW_PATH_INC', SITE_ROOT . 'view/inc/');

    //TOP_PAGES
    define('VIEW_PATH_TOP', SITE_ROOT . 'view/inc/top_pages/');
    
    //RESOURCES
    define('RESOURCES', SITE_ROOT . 'resources/');
    
    //MEDIA
    define('MEDIA_PATH',SITE_ROOT . '/media/');
    
    //UTILS
    define('UTILS', SITE_ROOT . 'utils/');
    
    //MODEL_HOME
    pattern ("HOME", "home");

    //MODEL_SONGS
    pattern ("SONGS", "songs");

    //MODEL_LOGIN
    pattern ("LOGIN", "login");

    //MODEL_SHOP
    pattern ("SHOP", "shop");

    //MODEL_CART
    pattern ("CART", "cart");

    //PATTERN
    function pattern ($module_M, $module_m){
        define('UTILS_' . $module_M, SITE_ROOT . 'modules/' . $module_m . '/utils/');
        define('MODEL_PATH_' . $module_M, SITE_ROOT . 'modules/' . $module_m . '/model/');
        define('DAO_' . $module_M, SITE_ROOT . 'modules/' . $module_m . '/model/DAO/');
        define('BLL_' . $module_M, SITE_ROOT . 'modules/' . $module_m . '/model/BLL/');
        define('MODEL_' . $module_M, SITE_ROOT . 'modules/' . $module_m . '/model/model/');
        define('JS_VIEW_' . $module_M, SITE_PATH . 'modules/' . $module_m . '/view/js/');
        define('HTML_' . $module_M, SITE_ROOT . 'modules/' . $module_m . '/view/');
    }

    //FRIENDLY
    define('URL_AMIGABLES', TRUE);
