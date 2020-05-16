<?php
class cart_dao {
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
    public function select_data_buy($db, $arrArgument) {

        for($i=0; $i<count($arrArgument['product']);$i++){
            $product = explode(":", $arrArgument['product'][$i]);
            $id_product = $product[0];
            $units = $product[1];
            $sql = "INSERT INTO purchase (id_purchase, product, units, user) VALUE ('$arrArgument[id_purchase]', '$id_product', '$units', '$arrArgument[user]');";
            $stmt = $db->ejecutar($sql);
        }

        return "true";
    }
    public function select_data_id_purchase($db) {
        $sql = "SELECT * FROM purchase ORDER BY id_purchase ASC LIMIT 1;";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
}
