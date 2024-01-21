<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

$mail = new PHPMailer(true);
try {
	$mail->SMTPDebug = 2;
 	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = 'promodolcepharm@gmail.com';
	$mail->Password = 'kwsg wldh sugr gzxa';
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->Port = 465;
    $mail->CharSet = 'utf-8';

	$mail->setLanguage('ru', 'language/');
	$mail->IsHTML(true);

	$mail->setFrom('robot@dolcefarm.kz', 'robot-Dolce-Farm');
  $mail->addAddress('vmarketolog@dolcepharm.kz');
  
  $mail->Subject = 'Заявка с сайта company.dolcepharm.kz - '.date("F j, Y, h:i");

  $body = '<h1>Заявка с сайта company.dolcepharm.kz</h1>';

  if(trim(!empty($_POST['full-name']))){
    $body.='<p><b>Имя:</b> '.$_POST['name'].'</p>';
  } else {
    $body.='<p>Имя не указано.</p>';
  }

  if(trim(!empty($_POST['company']))){
    $body.='<p><b>Имя:</b> '.$_POST['company'].'</p>';
  } else {
    $body.='<p>Компания не указана.</p>';
  }

  if(trim(!empty($_POST['phone'])) && strlen(trim($_POST['phone'])) > 4) {
    $body.='<p><b>Номер телефона:</b> '.$_POST['phone'].'</p>';
  } else {
    $body.='<p>Номер телефона не указан.</p>';
  }

  if(trim(!empty($_POST['email']))){
    $body.='<p><b>Почта:</b> '.$_POST['email'].'</p>';
  } else {
    $body.='<p>Почта не указана.</p>';
  }

  $mail->Body = $body;

  if (!$mail->send()) {
    $message = 'Error';
  } else {
    $message = 'OK';
  }

} catch (Exception $e) {
  $message = 'Error';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>