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

    //MODEL_SONGS
    define('UTILS_SONGS', SITE_ROOT . 'modules/songs/utils/');
    define('MODEL_PATH_SONGS', SITE_ROOT . 'modules/songs/model/');
    define('DAO_SONGS', SITE_ROOT . 'modules/songs/model/DAO/');
    define('BLL_SONGS', SITE_ROOT . 'modules/songs/model/BLL/');
    define('MODEL_SONGS', SITE_ROOT . 'modules/songs/model/model/');
    define('JS_VIEW_SONGS', SITE_PATH . 'modules/songs/view/js/');
    define('HTML_SONGS', SITE_ROOT . 'modules/songs/view/');

    //MODEL_LOGIN
    define('UTILS_LOGIN', SITE_ROOT . 'modules/login/utils/');
    define('MODEL_PATH_LOGIN', SITE_ROOT . 'modules/login/model/');
    define('DAO_LOGIN', SITE_ROOT . 'modules/login/model/DAO/');
    define('BLL_LOGIN', SITE_ROOT . 'modules/login/model/BLL/');
    define('MODEL_LOGIN', SITE_ROOT . 'modules/login/model/model/');
    define('JS_VIEW_LOGIN', SITE_PATH . 'modules/login/view/js/');
    define('HTML_LOGIN', SITE_ROOT . 'modules/login/view/');

    //amigables
    define('URL_AMIGABLES', FALSE);
