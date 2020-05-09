<?php
class login_dao {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function insert_data_register($db,$arrArgument) {
        $token = openssl_random_pseudo_bytes(16);
        $token = bin2hex($token);
        $hashemail=md5( strtolower( trim( $arrArgument['email'] ) ) );
        $avatar="https://www.gravatar.com/avatar/" . $hashemail;
        $psswdhash =  password_hash($arrArgument['psswd'], PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (idusers, username, email, psswd, avatar, token)
        VALUES ( '$arrArgument[username]', '$arrArgument[username]','$arrArgument[email]','$psswdhash', '$avatar', '$token');";
        
        $return = array(
            "work" => $db->ejecutar($sql),
            "token" =>  $token
        );
        
        return $return;
    }
    public function insert_data_activate($db,$arrArgument){
        $sql = "UPDATE users SET active=1 WHERE token='$arrArgument'";
        return $db->ejecutar($sql);
    }
    public function select_data_login($db,$arrArgument) {
        $sql = "SELECT * FROM users WHERE idusers='$arrArgument'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
