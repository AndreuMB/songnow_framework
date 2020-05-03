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
    define('UTILS_HOME', SITE_ROOT . 'modules/home/utils/');
    define('MODEL_PATH_HOME', SITE_ROOT . 'modules/home/model/');
    define('DAO_HOME', SITE_ROOT . 'modules/home/model/DAO/');
    define('BLL_HOME', SITE_ROOT . 'modules/home/model/BLL/');
    define('MODEL_HOME', SITE_ROOT . 'modules/home/model/model/');
    define('JS_VIEW_HOME', SITE_PATH . 'modules/home/view/js/');
    define('HTML_HOME', SITE_ROOT . 'modules/home/view/');

    //amigables
    define('URL_AMIGABLES', TRUE);
