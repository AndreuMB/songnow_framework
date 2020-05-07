<?php
class songs_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = songs_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function pagination(){
        return $this->bll->obtain_data_pagination_BLL();
    }

    public function page($arrArgument){
        return $this->bll->obtain_data_page_BLL($arrArgument);
    }

    public function categories(){
        return $this->bll->obtain_data_categories_BLL();
    }
    public function filter($arrArgument){
        return $this->bll->obtain_data_filter_BLL($arrArgument);
    }
    public function read($arrArgument){
        return $this->bll->obtain_data_read_BLL($arrArgument);
    }
    public function sum_view($arrArgument){
        return $this->bll->obtain_data_sum_view_BLL($arrArgument);
    }
    public function map(){
        return $this->bll->obtain_data_map_BLL();
    }
    public function cat($arrArgument){
        return $this->bll->obtain_data_cat_BLL($arrArgument);
    }
}