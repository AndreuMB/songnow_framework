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
    public function fpsswd($arrArgument){
        return $this->bll->obtain_data_fpsswd_BLL($arrArgument);
    }
    public function rpsswd($arrArgument){
        return $this->bll->obtain_data_rpsswd_BLL($arrArgument);
    }
    public function save_token($arrArgument){
        return $this->bll->update_data_token_BLL($arrArgument);
    }
    public function token($arrArgument){
        return $this->bll->obtain_data_token_BLL($arrArgument);
    }
    public function login_a($arrArgument){
        return $this->bll->obtain_data_login_a_BLL($arrArgument);
    }
    public function id_user($arrArgument){
        return $this->bll->obtain_data_id_user_a_BLL($arrArgument);
    }
    
    
}