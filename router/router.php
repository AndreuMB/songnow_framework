<?php
require_once("paths.php");

include(UTILS . "utils.inc.php");
include(UTILS . "common.inc.php");
include(UTILS . "apis/apis.inc.php");
include(UTILS . "mail.inc.php");

function error404(){
    require_once(VIEW_PATH_INC . "header.php");
    require_once(VIEW_PATH_INC . "menu.php");
    require_once(VIEW_PATH_INC . "404.php");
    require_once(VIEW_PATH_INC . "footer.html"); 
}

function handlerRouter() {
    if (!empty($_GET['module'])) {
        $URI_module = $_GET['module'];
    } else {
        $URI_module = 'contact';
        header('Location: '. amigable('module=contact'));
    }

    if (!empty($_GET['function'])) {
        $URI_function = $_GET['function'];
    } else {
        $URI_function = 'list_' . $URI_module;
    }
    handlerModule($URI_module, $URI_function);
}

function handlerModule($URI_module, $URI_function) {
    $modules = simplexml_load_file('resources/modules.xml');
    $exist = false;
    
    foreach ($modules->module as $module) {
        if (($URI_module === (String) $module->uri)) {
            $exist = true;

            $path = MODULES_PATH . $URI_module . "/controller/controller_" . $URI_module . ".class.php";
            if (file_exists($path)) {
                require_once($path);
                $controllerClass = "controller_" . $URI_module;
                $obj = new $controllerClass;
            } else {
                error404();
            }
            handlerfunction(((String) $module->name), $obj, $URI_function);
            break;
        }
    }
    if (!$exist) {
        error404();
    }
}

function handlerfunction($module, $obj, $URI_function) {
    $functions = simplexml_load_file(MODULES_PATH . $module . "/resources/function.xml");
    $exist = false;

    foreach ($functions->function as $function) {
        if (($URI_function === (String) $function->uri)) {
            $exist = true;
            $event = (String) $function->name;
            break;
        }
    }

    if (!$exist) {
        error404();
    } else {
        call_user_func(array($obj, $event));
    }
}

handlerRouter();
