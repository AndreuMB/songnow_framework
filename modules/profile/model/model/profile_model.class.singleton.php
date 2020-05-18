<?php
class profile_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = profile_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function c_user($arrArgument){
        return $this->bll->update_user_BLL($arrArgument);
    }
}