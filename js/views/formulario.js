export default {
  template: 'views/formulario.html',
  init: () => {
    const form = document.getElementById('formCadastro');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      alert(`Dados enviados com sucesso!\n\n${JSON.stringify(payload, null, 2)}`);
      form.reset();
    });
  }
};