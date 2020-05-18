<?php
	class profile_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
	        $this->dao = profile_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {
	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
	    }

		public function update_user_BLL($arrArgument){
			return $this->dao->update_user($this->db,$arrArgument);
		}
		
	}