<?php
class common {

    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function loadModel($model_path, $model_name, $function, $arrArgument = '',$arrArgument2 = ''){
        $model = $model_path . $model_name . '.class.singleton.php';
        
        if (file_exists($model)) {
            include_once($model);
            
            $modelClass = $model_name;

            if (!method_exists($modelClass, $function)){
                throw new Exception();
            }
            
            $obj = $modelClass::getInstance();

            // return $obj;

            if (isset($arrArgument)){
                
                if (isset($arrArgument2)) {
                    //return $obj->$function($arrArgument,$arrArgument2);
                    return call_user_func(array($obj, $function),$arrArgument,$arrArgument2);
                }
                //return $obj->$function($arrArgument);
                return call_user_func(array($obj, $function),$arrArgument);
            }   

        } else {
            throw new Exception();
        }
    }

    public function loadView($rutaVista = '', $templateName = '', $arrPassValue = '') {
        $view_path = $rutaVista . $templateName;
        $arrData = '';

        if (file_exists($view_path)) {
            if (isset($arrPassValue))
                $arrData = $arrPassValue;
            include_once($view_path);
        } else {
            /*$result = response_code($rutaVista);
            $arrData = $result;
            require_once VIEW_PATH_INC_ERROR . "error.php";*/
            //die();
        }
    }
}
  
