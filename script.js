// Alterna o menu mobile
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.querySelector('.menu-toggle');
  const open = menu.classList.contains('open');
  if (open) {
    menu.classList.remove('open'); menu.classList.add('closed');
    btn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // libera scroll
  } else {
    menu.classList.add('open'); menu.classList.remove('closed');
    btn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // trava scroll de fundo
  }
}

// Fecha o menu se a tela voltar para desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 981) {
    const menu = document.getElementById('mobileMenu');
    menu?.classList.remove('open'); menu?.classList.add('closed');
    document.body.style.overflow = '';
  }
});

// Filtro de horários
const tb = document.getElementById('tb');
document.querySelectorAll('[data-filter]')?.forEach(btn => {
  btn.addEventListener('click', () => {
    const tag = btn.dataset.filter;
    [...tb.tBodies[0].rows].forEach(r => {
      if (tag === 'todos') r.style.display = '';
      else r.style.display = r.dataset.tags.includes(tag) ? '' : 'none';
    });
  });
});

// Form aula experimental → WhatsApp
const trial = document.getElementById('trial');
const trialMsg = document.getElementById('trialMsg');
trial?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(trial);
  const nome = fd.get('nome');
  const periodo = fd.get('periodo'); const nivel = fd.get('nivel');
  const extra = fd.get('mensagem') || '';
  const msg = encodeURIComponent(`Olá! Sou ${nome}. Quero aula experimental (${nivel}) no período ${periodo}. ${extra ? 'Obs: ' + extra : ''}`);
  trialMsg.textContent = 'Abrindo WhatsApp…';
  window.open(`https://wa.me/5511959638406?text=${msg}`, '_blank');
  setTimeout(() => trialMsg.textContent = 'Se preferir, retornaremos por mensagem.', 1200);
});

// Ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// SEO via JSON-LD
(function () {
  const ld = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Michel Miyashita",
    "sport": "Jiu-Jitsu",
    "telephone": "+55 11 95963-8406",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. Domingos Fasolari, 180",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "openingHours": ["Mo-Fr 07:00-21:30", "Sa 10:00-11:30"],
    "url": window.location.href
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
})();
