'use strict';

document.addEventListener('DOMContentLoaded', function () {
  initAccordion();
  initScrollReveal();
  initNavScroll();
  initActiveNav();
});

function initAccordion() {
  var workItems = document.querySelectorAll('.work-item');

  workItems.forEach(function (item) {
    var btn    = item.querySelector('.work-row');
    var detail = item.querySelector('.work-detail');
    if (!btn || !detail) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all other items (single-open accordion)
      workItems.forEach(function (other) {
        if (other !== item && other.classList.contains('is-open')) {
          closeItem(other);
        }
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  function openItem(item) {
    var detail = item.querySelector('.work-detail');
    var btn    = item.querySelector('.work-row');
    detail.removeAttribute('hidden');
    item.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeItem(item) {
    var detail = item.querySelector('.work-detail');
    var btn    = item.querySelector('.work-row');
    item.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    detail.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'max-height') {
        detail.setAttribute('hidden', '');
        detail.removeEventListener('transitionend', handler);
      }
    });
  }
}

function initScrollReveal() {
  var elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(function (el) { observer.observe(el); });
}

function initNavScroll() {
  var nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('nav-scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initActiveNav() {
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
}
