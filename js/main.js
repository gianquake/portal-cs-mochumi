document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú móvil accesible (WCAG 2.1 AA)
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('open');
    });
  }

  // 2. Submenú "Más" en móvil y teclado
  const dropdownBtn = document.querySelector('.nav__dropdown-btn');
  const dropdownParent = document.querySelector('.nav__dropdown');

  if (dropdownBtn && dropdownParent) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownParent.classList.toggle('open');
      dropdownBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', () => {
      dropdownParent.classList.remove('open');
      dropdownBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // 3. Cuadro de búsqueda de trámites institucionales (tramites.html / faq.html)
  const searchInput = document.getElementById('buscadorTramites');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const filtro = e.target.value.toLowerCase().trim();
      const items = document.querySelectorAll('.item-filtrable');

      items.forEach((item) => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(filtro) ? '' : 'none';
      });
    });
  }

  // 4. Manejo nativo de formularios (Citas y Contacto)
  const formularios = document.querySelectorAll('.form-institucional');
  formularios.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const alerta = form.querySelector('.form-respuesta');
      if (alerta) {
        alerta.style.display = 'block';
        alerta.textContent = 'Solicitud recibida correctamente. Nuestro equipo de admisión del C.S. Mochumí se comunicará contigo a la brevedad.';
      }
      form.reset();
    });
  });
});