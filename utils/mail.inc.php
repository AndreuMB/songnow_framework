<?php
    function email($arr) {
        
        $html = '';
        $subject = '';
        $body = '';
        $ruta = '';
        $return = '';
        
        switch ($arr['type']) {
            case 'contact':
                $address = $arr['inputEmail'];
                $subject = 'We recived your email';
                $ruta = '<a href="http://localhost/songnow_framework/">web</a>';
                $html = "Hello thanks for trusting us we are attending to your message.<br>Please wait a bit for our response.<br><br>Return to the " . $ruta;
            break;

            case 'admin':
                $address = 'andreuolleria@gmail.com';
                $subject = "Issue ". $arr['inputName'];
                $html = 'email: ' . $arr['inputEmail']. '<br>' . 'name: ' . $arr['inputName'] . '<br>Message: ' . $arr['inputMessage'];
            break;
        }
        $html .= "<br><br><b>Sent by SONGNOW</b>";

        $result = send_mailgun('songnow@gmail.com', $address, $subject, $html);
        return $result;
    }

    function send_mailgun($from, $email, $subject, $html){
        $config = array();
        $config['api_key'] = $GLOBALS["api_key"]; //API Key
        $config['api_url'] = $GLOBALS["api_url"]; //API Base URL
        $message = array();
        $message['from'] = $from;
        $message['to'] =  $email;
        $message['h:Reply-To'] = "songnow@gmail.com";
        $message['subject'] = $subject;
        $message['html'] = $html;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $config['api_url']);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }
