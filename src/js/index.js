// for the accordion functionality on sidebar
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    const trigger = accordion.querySelector('.accordion-trigger');
    const content = accordion.querySelector('.accordion-content');
    const icon = accordion.querySelector('.accordion-icon');

    trigger.addEventListener('click', () => {
      content.classList.toggle('open');
      icon.classList.toggle('rotated');
      accordion.classList.toggle('active');
    });
  });
});

// dropdown menu functionality
const btn = document.getElementById('userDropdownBtn');
const dropdown = document.getElementById('userDropdown');
const arrow = document.getElementById('arrowIcon');

btn.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
  arrow.classList.toggle('rotate-180');
});

// for the side bar toggle
(function () {
  const sidebar = document.getElementById('main-sidebar');
  const main = document.querySelector('.mainContent');
  const toggle = document.getElementById('sidebar-toggle');

  if (!sidebar || !main || !toggle) return;

  const cls = {
    desktopClose: 'sidebar-closed',
    mobileOpen: 'sidebar-mobile-open',
    mainFull: 'main--full',
  };

  const isDesktop = () => window.innerWidth >= 768;

  function openMobile() {
    sidebar.classList.add(cls.mobileOpen);
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMobile() {
    sidebar.classList.remove(cls.mobileOpen);
    toggle.setAttribute('aria-expanded', 'false');
  }
  function toggleDesktop() {
    const closed = sidebar.classList.toggle(cls.desktopClose);
    main.classList.toggle(cls.mainFull, closed);
    toggle.setAttribute('aria-expanded', String(!closed));
  }

  toggle.addEventListener('click', () => {
    if (isDesktop()) {
      sidebar.classList.remove(cls.mobileOpen);
      toggleDesktop();
    } else {
      sidebar.classList.contains(cls.mobileOpen) ? closeMobile() : openMobile();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains(cls.mobileOpen)) {
      closeMobile();
    }
  });

  window.addEventListener('resize', () => {
    if (isDesktop()) {
      sidebar.classList.remove(cls.mobileOpen);
    } else {
      sidebar.classList.remove(cls.desktopClose);
      main.classList.remove(cls.mainFull);
    }
  });

  toggle.setAttribute('aria-expanded', isDesktop() ? 'true' : 'false');
})();
