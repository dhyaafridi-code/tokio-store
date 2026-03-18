<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // الحصول على البيانات من React
    $data = json_decode(file_get_contents('php://input'), true);

    // معالجة البيانات هنا أو التواصل مع قاعدة البيانات
    $response = [
        'status' => 'success',
        'message' => 'Data received successfully',
        'received_data' => $data
    ];
    echo json_encode($response);
} else {
    echo json_encode(['message' => 'Invalid request']);
}
?>