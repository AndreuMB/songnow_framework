<?php
class profile_dao {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function update_user($db,$arrArgument) {
        $sql = "UPDATE users SET username='$arrArgument[username]' WHERE idusers='$arrArgument[idusers]'";
        return $db->ejecutar($sql);
    }
}
