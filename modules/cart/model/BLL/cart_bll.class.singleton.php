<?php
	class cart_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
	        $this->dao = cart_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {
	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
	    }

		public function obtain_data_products_BLL(){
			return $this->dao->select_data_products($this->db);
		}
		public function obtain_data_id_purchase_BLL(){
			return $this->dao->select_data_id_purchase($this->db);
		}
		public function obtain_data_buy_BLL($arrArgument){
			return $this->dao->select_data_buy($this->db,$arrArgument);
		}
		
	}