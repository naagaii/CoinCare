// Dados de exemplo para os gastos financeiros em diferentes meses
const graficoMeses = {
    janeiro: {
        columns: [
            ["Gastos Fixos", 1000],
            ["Economias", 300],
            ["Viagens", 150],
            ["Lazer", 100],
        ],
    },
    fevereiro: {
        columns: [
            ["Gastos Fixos", 1000],
            ["Economias", 250],
            ["Viagens", 200],
            ["Lazer", 120],
        ],
    },
    marco: {
        columns: [
            ["Gastos Fixos", 1000],
            ["Economias", 350],
            ["Viagens", 180],
            ["Lazer", 110],
        ],
    },
};

// Função para atualizar o gráfico e os detalhes das despesas com base no mês selecionado
function atualizarDadosmes(month) {
    // Obtém os dados de despesas para o mês selecionado
    const expense = graficoMeses[month];

    // Atualiza o gráfico com os novos dados
    chart.load({
        columns: expense.columns,
        unload: true,
    });

    // Calcula o total das despesas para calcular as porcentagens
    const total = expense.columns.reduce((sum, item) => sum + item[1], 0);

    // Obtém a div onde os detalhes das despesas serão exibidos
    const detailsDiv = document.getElementById("expense-details");

    // Atualiza a div com os detalhes das despesas, incluindo valores e porcentagens
    detailsDiv.innerHTML = expense.columns.map(item => {
        const percentage = ((item[1] / total) * 100).toFixed(2);
        return `<p>${item[0]}: R$${item[1]} (${percentage}%)</p>`;
    }).join("");
}

// Adiciona um listener ao seletor de mês para atualizar o gráfico e os detalhes quando o mês é alterado
document.getElementById("month-select").addEventListener("change", (event) => {
    atualizarDadosmes(event.target.value);
});

// Gera o gráfico de pizza inicialmente com os dados de janeiro
let chart = bb.generate({
    data: {
        columns: graficoMeses.janeiro.columns,
        type: "pie",
        onclick: function (d, i) {
            console.log("onclick", d, i); // Exibe informações no console quando um segmento do gráfico é clicado
        },
        onover: function (d, i) {
            console.log("onover", d, i); // Exibe informações no console quando o mouse passa sobre um segmento do gráfico
        },
        onout: function (d, i) {
            console.log("onout", d, i); // Exibe informações no console quando o mouse sai de um segmento do gráfico
        },
    },
    bindto: "#donut-chart", // Vincula o gráfico ao elemento com o ID "donut-chart"
});

// Atualiza o gráfico e os detalhes das despesas para o mês inicial (janeiro)
atualizarDadosmes("janeiro");