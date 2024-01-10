<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Configurações do servidor SMTP
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host       = dotenv('SMPT');
        $mail->SMTPAuth   = true;
        $mail->Username   = dotenv('EMAIL');
        $mail->Password   = dotenv('PASS');
        $mail->SMTPSecure = 'tls'; // tls ou ssl
        $mail->Port       = 587;    // A porta pode variar de acordo com a configuração do seu servidor

        // Remetente e destinatário
        $mail->setFrom($email, $name);
        $mail->addAddress(dotenv('EMAIL')); // Substitua pelo seu endereço de e-mail

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "Nome: $name<br>E-mail: $email<br>Assunto: $subject<br><br>Mensagem:<br>$message";

        $mail->send();
        echo "success";
    } catch (Exception $e) {
        echo "error";
    }
} else {
    echo "error";
}
?>
