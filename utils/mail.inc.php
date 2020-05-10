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
                $ruta = '<a href="'.amigable('module=home').'">web</a>';
                $html = "Hello thanks for trusting us we are attending to your message.<br>Please wait a bit for our response.<br><br>Return to the " . $ruta;
            break;

            case 'admin':
                $address = 'andreuolleria@gmail.com';
                $subject = "Issue ". $arr['inputName'];
                $html = 'email: ' . $arr['inputEmail']. '<br>' . 'name: ' . $arr['inputName'] . '<br>Message: ' . $arr['inputMessage'];
            break;

            case 'register':
                $address = $arr['email'];
                $subject = 'Activate account';
                $ruta = '<a href="'.amigable('module=home', true).'">web</a>';
                $link='<a href="'.amigable('module=login&function=activate&token='.$arr['token'].'', true).'">link</a>';
                $html = "Hello ".$arr['username']." thanks for register.<br>Click this  " . $link . " for activate account.<br><br>Return to the " . $ruta;
            break;

            case 'psswd':
                $address = $arr['email'];
                $subject = 'Change psswd';
                $ruta = '<a href="'.amigable('module=home', true).'">web</a>';
                $link='<a href="'.amigable('module=login&function=cpsswd&token='.$arr['token'].'', true).'">link</a>';
                $html = "Hello ".$arr['username'].".<br>Click this  " . $link . " for change your password.<br><br>Return to the " . $ruta;
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
