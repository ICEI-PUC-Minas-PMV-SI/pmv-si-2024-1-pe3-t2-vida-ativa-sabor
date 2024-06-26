function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
}

document.addEventListener("DOMContentLoaded", function() {
    const buscarUsuariosButton = document.getElementById("buscarUsuarios");
    if (buscarUsuariosButton) {
        buscarUsuariosButton.addEventListener("click", function() {
            const userId = getCookie("id"); // Obtém o ID do usuário logado
            const userRole = getCookie("adm"); // Obtém o papel do usuário logado (administrador ou não)

            fetch('/usuarios')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar usuários');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Dados recebidos:", data); // Verifica se os dados foram recebidos corretamente

                    const tabelaUsuarios = document.getElementById('usersTableBody');
                    if (!tabelaUsuarios) {
                        console.error('Elemento com o ID "usersTableBody" não encontrado no DOM.');
                        return;
                    }

                    tabelaUsuarios.innerHTML = '';

                    data.forEach(usuario => {
                        // Se for administrador ou se o ID do usuário for igual ao ID do usuário logado
                        if (userRole === "S" || usuario.ID === parseInt(userId)) {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                                <td class="editable">${usuario.ID}</td>
                                <td class="editable">${usuario.NOME}</td>
                                <td class="editable">${usuario.DATNAS}</td>
                                <td class="editable">${usuario.EMAIL}</td>
                                <td class="editable">${usuario.SENHA}</td>
                                <td class="editable">${usuario.TEL}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary editarUsuario">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-success salvarEdicaoUsuario" style="display: none;">
                                        <i class="bi bi-check"></i>
                                    </button>
                                </td>
                            `;
                            tabelaUsuarios.appendChild(tr);

                            const editarUsuarioButton = tr.querySelector('.editarUsuario');
                            const salvarEdicaoUsuarioButton = tr.querySelector('.salvarEdicaoUsuario');

                            editarUsuarioButton.addEventListener("click", function() {
                                tr.querySelectorAll('.editable').forEach(cell => {
                                    const textoAtual = cell.textContent.trim();
                                    const input = document.createElement('input');
                                    input.value = textoAtual;
                                    cell.textContent = '';
                                    cell.appendChild(input);
                                });
                                editarUsuarioButton.style.display = 'none';
                                salvarEdicaoUsuarioButton.style.display = 'inline-block';
                            });

                            salvarEdicaoUsuarioButton.addEventListener("click", function() {
                                const rowData = {
                                    ID: tr.cells[0].querySelector('input').value,
                                    NOME: tr.cells[1].querySelector('input').value,
                                    DATNAS: tr.cells[2].querySelector('input').value,
                                    EMAIL: tr.cells[3].querySelector('input').value,
                                    SENHA: tr.cells[4].querySelector('input').value,
                                    TEL: tr.cells[5].querySelector('input').value
                                };

                                console.log("Dados editados:", rowData);

                                fetch('/editar-usuario', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(rowData)
                                })
                                .then(response => {
                                    return response.json();
                                })
                                .then(data => {
                                    console.log('Usuário editado com sucesso:', data);

                                    tr.querySelectorAll('.editable').forEach(cell => {
                                        const input = cell.querySelector('input');
                                        cell.textContent = input.value;
                                    });

                                    editarUsuarioButton.style.display = 'inline-block';
                                    salvarEdicaoUsuarioButton.style.display = 'none';
                                })
                                .catch(error => {
                                    console.error('Erro ao editar usuário:', error);

                                    // Em caso de erro, mantenha os campos editáveis e os botões de edição visíveis
                                    tr.querySelectorAll('.editable').forEach(cell => {
                                        const input = cell.querySelector('input');
                                        cell.textContent = input.value;
                                    });

                                    editarUsuarioButton.style.display = 'inline-block';
                                    salvarEdicaoUsuarioButton.style.display = 'none';
                                });
                            });
                        }
                    });
                })
                .catch(error => {
                    console.error('Erro ao buscar usuários:', error);
                    alert('Erro ao buscar usuários. Por favor, tente novamente.');
                });
        });
    } else {
        console.error("O botão 'buscarUsuarios' não foi encontrado no DOM.");
    }
});
