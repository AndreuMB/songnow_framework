<?php
require 'autoload.php';
require_once("paths.php");
// include(UTILS . "utils.inc.php");
// include(UTILS . "common.inc.php");
include(UTILS . "apis/apis.php"); // api mailgun
// include(UTILS . "mail.inc.php");

class router {

    public $utils;
    public $common;
    public $mail;
    static $_instance;

    private function __construct() {
        $this->utils = utils::getInstance();
        $this->common = common::getInstance();
        $this->mail = mail::getInstance();
        $this->handlerRouter();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    private function error404(){
        require_once(VIEW_PATH_INC . "header.php");
        require_once(VIEW_PATH_INC . "menu.php");
        require_once(VIEW_PATH_INC . "404.php");
        require_once(VIEW_PATH_INC . "footer.html"); 
    }

    private function handlerRouter() {
        if (!empty($_GET['module'])) {
            $URI_module = $_GET['module'];
        } else {
            $URI_module = 'home';
            header('Location: '. $this->utils->amigable('module=home', true));
        }
    
        if (!empty($_GET['function'])) {
            $URI_function = $_GET['function'];
        } else {
            $URI_function = 'list_' . $URI_module;
        }
        $this->handlerModule($URI_module, $URI_function);
    }
    
    private function handlerModule($URI_module, $URI_function) {
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
                    $this->error404();
                }
                $this->handlerfunction(((String) $module->name), $obj, $URI_function);
                break;
            }
        }
        if (!$exist) {
            echo $URI_module;
            echo (String) $module->uri;
            $this->error404();
        }
    }
    
    private function handlerfunction($module, $obj, $URI_function) {
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
            $this->error404();
        } else {
            call_user_func(array($obj, $event));
        }
    }
}

router::getInstance();
