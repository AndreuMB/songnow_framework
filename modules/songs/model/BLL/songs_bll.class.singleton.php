<?php
	class songs_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
	        $this->dao = songs_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {
	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
	    }

		public function obtain_data_pagination_BLL(){
			return $this->dao->select_data_pagination($this->db);
		}

		public function obtain_data_page_BLL($arrArgument){
			return $this->dao->select_data_page($this->db,$arrArgument);
		}

		public function obtain_data_categories_BLL(){
			return $this->dao->select_data_categories($this->db);
		}
		
		public function obtain_data_filter_BLL($arrArgument){
			return $this->dao->select_data_filter($this->db,$arrArgument);
		}
		public function obtain_data_read_BLL($arrArgument){
			return $this->dao->select_data_read($this->db,$arrArgument);
		}
		public function obtain_data_sum_view_BLL($arrArgument){
			return $this->dao->select_data_read($this->db,$arrArgument);
		}
		public function obtain_data_map_BLL(){
			return $this->dao->select_data_map($this->db);
		}
		public function obtain_data_cat_BLL($arrArgument){
			return $this->dao->select_data_cat($this->db,$arrArgument);
		}
	}