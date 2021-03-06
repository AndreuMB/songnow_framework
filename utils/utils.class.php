<?php
class utils {

    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function amigable($url, $return = false) {
        $amigableson = URL_AMIGABLES;
        $link = "";
        $count = 0;
        if ($amigableson) {
            $url = explode("&", str_replace("?", "", $url));
            foreach ($url as $key => $value) {
                $aux = explode("=", $value);
                if ($count == 0){
                    $link .=  $aux[1];
                }else{
                    $link .=  "/" . $aux[1];
                }
                $count++;
            }
        } else {
            $link = "index.php?" . $url;
        }
        if ($return) {
            return SITE_PATH . $link;
        }
        echo SITE_PATH . $link;
    }
}