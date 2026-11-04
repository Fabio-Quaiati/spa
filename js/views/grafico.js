export default {
  template: 'views/grafico.html',
  init: () => {
    const canvas = document.getElementById('meuGraficoCanvas');
    if (!canvas) return;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Requisições / Mês',
          data: [70, 95, 80, 115, 140, 125],
          backgroundColor: 'rgba(2, 132, 199, 0.7)',
          borderColor: 'rgb(2, 132, 199)',
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
};