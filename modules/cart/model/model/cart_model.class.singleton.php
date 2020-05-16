<?php
class cart_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = cart_bll::getInstance();
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
    public function id_purchase(){
        return $this->bll->obtain_data_id_purchase_BLL();
    }
    public function buy($arrArgument){
        return $this->bll->obtain_data_buy_BLL($arrArgument);
    }
}