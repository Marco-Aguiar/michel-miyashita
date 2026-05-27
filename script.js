const WHATSAPP_NUMBER = '5511959638406';

const mobileMenu = document.getElementById('mobileMenu');
const menuButton = document.querySelector('.menu-toggle');
const trialForm = document.getElementById('trial');
const trialMsg = document.getElementById('trialMsg');
const yearElement = document.getElementById('year');

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}

function isMenuOpen() {
  return mobileMenu?.classList.contains('open');
}

function openMenu() {
  mobileMenu?.classList.add('open');
  mobileMenu?.classList.remove('closed');

  menuButton?.classList.add('active');
  menuButton?.setAttribute('aria-expanded', 'true');

  document.body.classList.add('menu-open');
}

function closeMenu() {
  mobileMenu?.classList.remove('open');
  mobileMenu?.classList.add('closed');

  menuButton?.classList.remove('active');
  menuButton?.setAttribute('aria-expanded', 'false');

  document.body.classList.remove('menu-open');
}

function toggleMenu() {
  if (isMenuOpen()) {
    closeMenu();
    return;
  }

  openMenu();
}

menuButton?.addEventListener('click', toggleMenu);

document.querySelectorAll('#mobileMenu a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 981) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isMenuOpen()) {
    closeMenu();
  }
});

trialForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(trialForm);

  const nome = String(formData.get('nome') || '').trim();
  const periodo = String(formData.get('periodo') || '').trim();
  const nivel = String(formData.get('nivel') || '').trim();
  const mensagem = String(formData.get('mensagem') || '').trim();

  if (!nome || !periodo || !nivel) {
    if (trialMsg) {
      trialMsg.textContent = 'Preencha nome, período e nível para continuar.';
    }

    return;
  }

  const whatsappMessage = [
    `Olá! Meu nome é ${nome}.`,
    `Gostaria de agendar uma aula experimental na Miyashita BJJ.`,
    `Nível: ${nivel}.`,
    `Período de preferência: ${periodo}.`,
    mensagem ? `Observação: ${mensagem}` : ''
  ]
    .filter(Boolean)
    .join('\n');

  if (trialMsg) {
    trialMsg.textContent = 'Abrindo WhatsApp...';
  }

  openWhatsApp(whatsappMessage);

  setTimeout(() => {
    if (trialMsg) {
      trialMsg.textContent =
        'Caso o WhatsApp não abra automaticamente, clique no botão flutuante da página.';
    }
  }, 1200);
});

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

(function addStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Miyashita BJJ',
    description:
      'Academia de Jiu-Jitsu em São Paulo com aulas para adultos, crianças, iniciantes e competidores.',
    sport: 'Jiu-Jitsu',
    telephone: '+55 11 95963-8406',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R. Domingos Fasolari, 180',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR'
    },
    openingHours: [
      'Mo 07:00-21:00',
      'Tu 12:00-21:00',
      'We 07:00-21:00',
      'Th 12:00-21:00',
      'Fr 12:00-20:30',
      'Sa 10:00-11:30'
    ],
    url: window.location.href,
    sameAs: []
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);

  document.head.appendChild(script);
})();