/* Plain JavaScript. Works with file:// and requires no build tools. */
(() => {
  'use strict';
  const header = document.getElementById('site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.getElementById('navigation');
  const toggleLabel = toggle.querySelector('.sr-only');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? 'Close navigation' : 'Open navigation';
    navigation.classList.toggle('open', open);
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  const desktop = window.matchMedia('(min-width: 851px)');
  desktop.addEventListener('change', event => { if (event.matches) setMenu(false); });
  function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 16); }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  document.getElementById('year').textContent = new Date().getFullYear();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('is-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('is-pending');
      observer.observe(element);
    });
    // Never leave content hidden if the observer fails to deliver.
    window.setTimeout(() => document.querySelectorAll('.is-pending').forEach(element => {
      element.classList.remove('is-pending');
    }), 4500);
  }

  const dialog = document.getElementById('menu-dialog');
  const openButton = document.getElementById('open-menu');
  const closeButton = dialog.querySelector('.dialog-close');
  openButton.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      document.body.classList.add('dialog-open');
      closeButton.focus();
    } else {
      window.location.href = 'tel:+18432365099';
    }
  });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    openButton.focus();
  });
})();
