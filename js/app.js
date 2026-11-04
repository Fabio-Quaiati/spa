import InicioView from './views/inicio.js';
import TabelaView from './views/tabela.js';
import FormularioView from './views/formulario.js';
import GraficoView from './views/grafico.js';

// Mapeamento das rotas
const routes = {
  '/': InicioView,
  '/tabela': TabelaView,
  '/formulario': FormularioView,
  '/grafico': GraficoView
};

async function router() {
  // Pega o caminho a partir do hash da URL (ex: #/tabela -> /tabela)
  const path = window.location.hash.slice(1) || '/';
  const view = routes[path] || routes['/'];

  const appContainer = document.getElementById('app');

  try {
    // 1. Busca o template HTML correspondente da view
    const response = await fetch(view.template);
    if (!response.ok) throw new Error(`Falha ao carregar ${view.template}`);
    const html = await response.text();

    // 2. Injeta o HTML dentro do container principal
    appContainer.innerHTML = html;

    // 3. Executa a lógica/eventos específicos da view (se houver)
    if (typeof view.init === 'function') {
      view.init();
    }
  } catch (error) {
    console.error(error);
    appContainer.innerHTML = `<div class="card"><p style="color:red;">Erro ao carregar o conteúdo da página.</p></div>`;
  }

  // 4. Atualiza o menu ativo
  document.querySelectorAll('nav a').forEach(link => {
    const route = link.getAttribute('href').replace('#', '');
    if (route === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Ouvintes de evento para navegação e primeiro carregamento
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);