document.getElementById('btnInsert').addEventListener('click', coletarEDepositarDados);

function coletarEDepositarDados() {
    // Coletar os valores dos inputs
    const titulo = document.getElementById('inputTitulo').value;
    const rendimento = document.getElementById('inputRendimento').value;
    const modoPreparo = document.getElementById('inputTP').value;
    const ingredientes = document.getElementById('inputIngredientes').value;
    const mp = document.getElementById('inputMP').value;

    // Criar um objeto com os dados
    const dados = {
        titulo: titulo,
        rendimento: rendimento,
        modoPreparo: modoPreparo,
        ingredientes: ingredientes,
        mp: mp
    };

    // Enviar os dados para o servidor usando fetch
    fetch('http://localhost:5500/dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Dados enviados com sucesso!');
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao enviar os dados.');
    });
}
