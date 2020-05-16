<?php
	class shop_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
	        $this->dao = shop_dao::getInstance();
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
		public function obtain_data_read_BLL($arrArgument){
			return $this->dao->select_data_read($this->db,$arrArgument);
		}
		
	}