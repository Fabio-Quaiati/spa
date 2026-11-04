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

// Controle do Menu Hambúrguer Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function closeMobileMenu() {
  if (menuToggle && navMenu) {
    menuToggle.classList.remove('open');
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Ao selecionar qualquer link do menu, fecha o menu e volta o conteúdo ao topo
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

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

  // 5. Fecha o menu mobile ao navegar
  closeMobileMenu();
}

// Ouvintes de evento para navegação e primeiro carregamento
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
