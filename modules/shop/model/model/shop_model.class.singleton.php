<?php
class shop_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = shop_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function products(){
        return $this->bll->obtain_data_products_BLL();
    }

    public function read($arrArgument){
        return $this->bll->obtain_data_read_BLL($arrArgument);
    }
}