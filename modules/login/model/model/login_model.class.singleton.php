<?php
class login_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = login_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function register($arrArgument){
        return $this->bll->obtain_data_register_BLL($arrArgument);
    }

    public function activate($arrArgument){
        return $this->bll->obtain_data_activate_BLL($arrArgument);
    }
    public function login($arrArgument){
        return $this->bll->obtain_data_login_BLL($arrArgument);
    }
}