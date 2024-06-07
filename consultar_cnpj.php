<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if (isset($_GET['cnpj'])) {
    $cnpj = $_GET['cnpj'];

    // Monta a URL para consulta
    $url = "https://www.receitaws.com.br/v1/cnpj/{$cnpj}";

    // Faz a requisição à API da ReceitaWS
    $response = file_get_contents($url);

    // Verifica se a requisição foi bem-sucedida
    if ($response !== false) {
        // Retorna os dados obtidos da API
        echo $response;
    } else {
        // Se houve um erro na requisição, retorna uma resposta de erro
        http_response_code(500);
        echo json_encode(array('error' => 'Erro ao consultar CNPJ.'));
    }
} else {
    // Se o CNPJ não foi fornecido, retorna uma resposta de erro
    http_response_code(400);
    echo json_encode(array('error' => 'CNPJ não fornecido.'));
}
?>
