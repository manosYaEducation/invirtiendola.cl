<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use Dotenv\Dotenv;

require '../vendor/autoload.php';

// Cargar variables de entorno
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Recibir los datos JSON
$datos = json_decode(file_get_contents('php://input'), true);

if ($datos) {
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $_ENV['SMTP_PORT'];

        // Configuración del correo
        $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
        $mail->addAddress($datos['emailDestino']);

        // Contenido
        $mail->CharSet = 'UTF-8';
        $mail->isHTML(true);
        $mail->Subject = 'Resultados de Cálculo de IVA';

        // Crear el contenido HTML del correo
        $contenido = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #5D737E; color: white; padding: 20px; text-align: center; border-radius: 5px; }
                .result-box { 
                    background-color: #f5f5f5; 
                    border-radius: 5px;
                    padding: 20px; 
                    margin: 20px 0;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .amount { color: #5D737E; font-size: 24px; font-weight: bold; }
                .detail { margin: 10px 0; }
                .footer { text-align: center; margin-top: 20px; color: #666; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Resultados del Cálculo de IVA</h1>
                </div>

                <div class='result-box'>
                    <h3>Cálculo desde Monto Neto:</h3>
                    <p class='detail'>Monto Neto: <span class='amount'>{$datos['neto']}</span></p>
                    <p class='detail'>IVA (19%): <span class='amount'>{$datos['iva']}</span></p>
                    <p class='detail'><strong>Monto Bruto: <span class='amount'>{$datos['bruto']}</span></strong></p>
                </div>

                <div class='result-box'>
                    <h3>Cálculo desde Monto Bruto:</h3>
                    <p class='detail'>Monto Bruto: <span class='amount'>{$datos['brutoMonto']}</span></p>
                    <p class='detail'>IVA (19%): <span class='amount'>{$datos['ivaBruto']}</span></p>
                    <p class='detail'><strong>Monto Neto: <span class='amount'>{$datos['netoBruto']}</span></strong></p>
                </div>

                <div class='footer'>
                    <p>Este correo fue generado automáticamente por la Calculadora de IVA.</p>
                </div>
            </div>
        </body>
        </html>
        ";

        $mail->Body = $contenido;
        $mail->AltBody = strip_tags($contenido);

        $mail->send();
        echo 'Correo enviado exitosamente';
    } catch (Exception $e) {
        http_response_code(500);
        echo "Error al enviar el correo: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(400);
    echo "No se recibieron datos";
}