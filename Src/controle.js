document.addEventListener("DOMContentLoaded", function() {
    const buscarUsuariosButton = document.getElementById("buscarUsuarios");
    if (buscarUsuariosButton) {
        buscarUsuariosButton.addEventListener("click", function() {
            fetch('/usuarios')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar usuários');
                    }
                    return response.json();
                })
                .then(data => {
                    const tabelaUsuarios = document.getElementById('usersTableBody');
                    if (!tabelaUsuarios) {
                        console.error('Elemento com o ID "usersTableBody" não encontrado no DOM.');
                        return;
                    }
                    tabelaUsuarios.innerHTML = '';
                    
                    data.forEach(usuario => {
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
                                /*if (!response.ok) {
                                    throw new Error('Erro ao editar usuário');
                                }*/
                                return response.json();
                            })
                            .then(data => {
                                console.log('Usuário editado com sucesso:', data);
                              
                            })
                            .catch(error => {
                                console.error('Erro ao editar usuário:', error);
                                
                            });

                            tr.querySelectorAll('.editable').forEach(cell => {
                                const input = cell.querySelector('input');
                                cell.textContent = input.value;
                            });

                            editarUsuarioButton.style.display = 'inline-block';
                            salvarEdicaoUsuarioButton.style.display = 'none';
                        });
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
