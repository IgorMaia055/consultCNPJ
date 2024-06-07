const input = document.getElementById('cnpj');

input.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    let formattedValue = '';

    // Adiciona os caracteres de formatação do CNPJ conforme o usuário digita
    if (value.length > 0) {
        formattedValue += value.substring(0, 2);
    }
    if (value.length > 2) {
        formattedValue += '.' + value.substring(2, 5);
    }
    if (value.length > 5) {
        formattedValue += '.' + value.substring(5, 8);
    }
    if (value.length > 8) {
        formattedValue += '/' + value.substring(8, 12);
    }
    if (value.length > 12) {
        formattedValue += '-' + value.substring(12, 14);
    }
    if (value.length > 14) {
        formattedValue += value.substring(14);
    }

    input.value = formattedValue;
});

function consultarCNPJ() {
    document.getElementById('btnConsultar').innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>'

    let cnpj = document.getElementById('cnpj').value.replace(/\D/g, ''); // Remove formatação do CNPJ

    // Faz a requisição AJAX para o script PHP
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `consultar_cnpj.php?cnpj=${cnpj}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                
                exibirInformacoesCNPJ(data)
            } else {
                console.error('Erro na consulta do CNPJ:', xhr.statusText);
                alert("Ops.. Algo deu errado! Tente novamente.")
                location.reload()
            }
        }
    };
    xhr.send();
}

function exibirInformacoesCNPJ(data) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Limpa o conteúdo anterior da tabela

    // Array com os campos que queremos exibir na tabela e seus respectivos nomes
    const campos = [
        { nome: 'Nome', valor: 'nome' },
        { nome: 'CNPJ', valor: 'cnpj' },
        { nome: 'Abertura', valor: 'abertura' },
        { nome: 'Situação', valor: 'situacao' },
        { nome: 'Tipo', valor: 'tipo' },
        { nome: 'Porte', valor: 'porte' },
        { nome: 'Natureza Jurídica', valor: 'natureza_juridica' },
        { nome: 'Atividade Principal', valor: 'atividade_principal' },
        { nome: 'Logradouro', valor: 'logradouro' },
        { nome: 'Número', valor: 'numero' },
        { nome: 'Complemento', valor: 'complemento' },
        { nome: 'Município', valor: 'municipio' },
        { nome: 'Bairro', valor: 'bairro' },
        { nome: 'UF', valor: 'uf' },
        { nome: 'CEP', valor: 'cep' },
        { nome: 'Email', valor: 'email' },
        { nome: 'Telefone', valor: 'telefone' },
        { nome: 'Data Situação', valor: 'data_situacao' },
        { nome: 'Última Atualização', valor: 'ultima_atualizacao' },
        { nome: 'Status', valor: 'status' },
        { nome: 'Capital Social', valor: 'capital_social' }
    ];

    // Itera sobre os campos e adiciona cada um na tabela
    campos.forEach(campo => {
        const valor = Array.isArray(data[campo.valor]) ? data[campo.valor][0].text : data[campo.valor]; // Trata caso o valor seja um array
        tableBody.innerHTML += `
            <tr>
                <th scope="row" class="text-secondary">${campo.nome}</th>
                <td>${valor}</td>
            </tr>
        `;
    });

    document.getElementById('resut').hidden = false

    document.getElementById('btnConsultar').innerHTML = 'Consultar'
}
