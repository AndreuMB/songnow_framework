<?php
	class login_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
	        $this->dao = login_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {
	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
	    }

		public function obtain_data_register_BLL($arrArgument){
			return $this->dao->insert_data_register($this->db,$arrArgument);
		}

		public function obtain_data_activate_BLL($arrArgument){
			return $this->dao->insert_data_activate($this->db,$arrArgument);
		}
		public function obtain_data_login_BLL($arrArgument){
			return $this->dao->select_data_login($this->db,$arrArgument);
		}
		public function obtain_data_fpsswd_BLL($arrArgument){
			return $this->dao->select_data_fpsswd($this->db,$arrArgument);
		}
		public function obtain_data_rpsswd_BLL($arrArgument){
			return $this->dao->select_data_rpsswd($this->db,$arrArgument);
		}
		
	}