<?php
class shop_dao {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_data_products($db) {
        $sql = "SELECT * FROM shop;";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_read($db, $arrArgument) {
        $sql = "SELECT * FROM shop where id='$arrArgument';";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

}
