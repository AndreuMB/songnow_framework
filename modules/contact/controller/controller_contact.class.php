<?php
	class controller_contact {
		// function __construct(){
		// 	$_SESSION['module'] = "contact";
		// }
		
		function list_contact(){
			// die("enter in list contact");
			require(VIEW_PATH_TOP . "top_" . $_GET['module'] . ".php");
			require(VIEW_PATH_INC . "menu.html");
			loadView('modules/contact/view/','contact_list.html');
			require(VIEW_PATH_INC . "footer.html");
		}
		
		function send_email(){
			$data_mail = $_POST['p_data']; // p_data=same u have in promise
			
			//SEND CLIENT
			$arrArgument = array(
				'type' => 'contact',
				'inputName' => $data_mail[0],
				'inputEmail' => $data_mail[1],
				'inputMessage' => $data_mail[2]
			);
			try{
				email($arrArgument);
			}catch(exeption $e){
				echo "error";
				exit;
			}

			//SEND ADMIN
			$arrArgument = array(
				'type' => 'admin',
				'inputName' => $data_mail[0],
				'inputEmail' => $data_mail[1],
				'inputMessage' => $data_mail[2]
			);
			try{
				email($arrArgument);
			}catch(exeption $e){
				echo "error";
				exit;
			}
			echo json_encode("done");
		}
		// function send_cont(){
		// 	$data_mail = array();
		// 	$data_mail = json_decode($_POST['fin_data'],true);
		// 	$arrArgument = array(
		// 		'type' => 'contact',
		// 		'token' => '',
		// 		'inputName' => $data_mail['cname'],
		// 		'inputEmail' => $data_mail['cemail'],
		// 		'inputSubject' => $data_mail['matter'],
		// 		'inputMessage' => $data_mail['message']
		// 	);
			
		// 	//set_error_handler('ErrorHandler');
		// 	try{
	    //         echo "<div class='alert alert-success'>".enviar_email($arrArgument)." </div>";
		// 	} catch (Exception $e) {
		// 		echo "<div class='alert alert-error'>Server error. Try later...</div>";
		// 	}
		// 	//restore_error_handler();

		// 	$arrArgument = array(
		// 		'type' => 'admin',
		// 		'token' => '',
		// 		'inputName' => $data_mail['cname'],
		// 		'inputEmail' => $data_mail['cemail'],
		// 		'inputSubject' => $data_mail['matter'],
		// 		'inputMessage' => $data_mail['message']
		// 	);
		// 	try{
	    //         enviar_email($arrArgument);
		// 	} catch (Exception $e) {
		// 		echo "<div class='alert alert-error'>Server error. Try later...</div>";
		// 	}
		// }

	}
