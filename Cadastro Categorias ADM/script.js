document.addEventListener('DOMContentLoaded', () => {
    const categorias = [
        { nome: 'GASTOS FIXOS', percentual: 50 },
        { nome: 'LAZER', percentual: 10 },
        { nome: 'TRANSPORTE', percentual: 10 },
        { nome: 'VIAGENS', percentual: 10 },
        { nome: 'ECONOMIAS', percentual: 20 },
    ];

    const categoriasTableBody = document.querySelector('#categorias-table tbody');
    const nomeCategoriaInput = document.querySelector('#nome-categoria');
    const percentualMaxInput = document.querySelector('#percentual-max');
    const adicionarButton = document.querySelector('#adicionar');

    function renderCategorias() {
        categoriasTableBody.innerHTML = '';
        categorias.forEach((categoria, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${categoria.nome}</td>
                <td>${categoria.percentual}%</td>
                <td><button class="excluir" data-index="${index}">Excluir</button></td>
            `;
            categoriasTableBody.appendChild(row);
        });

        document.querySelectorAll('.excluir').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                categorias.splice(index, 1);
                renderCategorias();
            });
        });
    }

    adicionarButton.addEventListener('click', () => {
        const nome = nomeCategoriaInput.value;
        const percentual = parseFloat(percentualMaxInput.value);

        if (nome && !isNaN(percentual)) {
            categorias.push({ nome, percentual });
            renderCategorias();
            nomeCategoriaInput.value = '';
            percentualMaxInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    renderCategorias();
});
