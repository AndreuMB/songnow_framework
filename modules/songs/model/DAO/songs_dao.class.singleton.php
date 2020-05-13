<?php
class songs_dao {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_data_pagination($db) {
        $sql = "SELECT count(*) tsongs FROM songs";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    public function select_data_page($db,$arrArgument) {
        $sql = "SELECT * FROM songs ORDER BY views DESC LIMIT 3 OFFSET $arrArgument";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_categories($db) {
        $sql = "SELECT * FROM img WHERE type='categories' ORDER BY views DESC";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_filter($db,$arrArgument) {
        $sql = "$arrArgument";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_read($db,$arrArgument) {
        $sql = "SELECT songs.*, img.rute FROM songs, img WHERE id_song='$arrArgument' AND songs.playlists=img.id";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_sum_view($db,$arrArgument) {
        $sql = "UPDATE songs set views=views+1 WHERE songs.id_song='$arrArgument'";
        return $db->ejecutar($sql);
    }
    public function select_data_map($db) {
        $sql = "SELECT * FROM map";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_cat($db,$arrArgument) {
        $sql = "SELECT * FROM songs WHERE playlists='$arrArgument'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_likes($db,$arrArgument) {
        $sql = "SELECT * FROM likes WHERE idusers='$arrArgument[0]' AND idsongs='$arrArgument[1]'";
        $stmt = $db->ejecutar($sql);
        $result = $db->listar($stmt);
        if ($result){
            $sql = "DELETE FROM likes WHERE idusers='$arrArgument[0]' AND idsongs='$arrArgument[1]'";
            return $db->ejecutar($sql);
        }else{
            $sql = "INSERT INTO likes (idusers, idsongs) VALUES ('$arrArgument[0]', '$arrArgument[1]')";
            return $db->ejecutar($sql);
        }
    }
    public function select_data_fav($db,$arrArgument) {
        $sql = "SELECT * FROM likes WHERE idusers='$arrArgument[0]'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    
}
