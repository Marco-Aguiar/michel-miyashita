const WHATSAPP_NUMBER = '5511959638406';

const mobileMenu = document.getElementById('mobileMenu');
const menuButton = document.querySelector('.menu-toggle');
const trialForm = document.getElementById('trial');
const trialMsg = document.getElementById('trialMsg');
const trialFormIpiranga = document.getElementById('trial-ipiranga');
const trialMsgIpiranga = document.getElementById('trialMsgIpiranga');
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

function buildTrialMessage(nome, telefone, nivel, periodo, mensagem, unidade) {
  return [
    `Olá! Meu nome é ${nome}.`,
    `Gostaria de agendar uma aula experimental na Miyashita BJJ${unidade ? ` - Unidade ${unidade}` : ''}.`,
    telefone ? `Telefone: ${telefone}.` : '',
    `Nível: ${nivel}.`,
    `Período de preferência: ${periodo}.`,
    mensagem ? `Observação: ${mensagem}` : ''
  ]
    .filter(Boolean)
    .join('\n');
}

function handleTrialSubmit(form, msgEl, unidade) {
  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const nome = String(formData.get('nome') || '').trim();
    const telefone = String(formData.get('telefone') || '').trim();
    const periodo = String(formData.get('periodo') || '').trim();
    const nivel = String(formData.get('nivel') || '').trim();
    const mensagem = String(formData.get('mensagem') || '').trim();

    if (!nome || !periodo || !nivel) {
      if (msgEl) {
        msgEl.textContent = 'Preencha nome, período e nível para continuar.';
      }
      return;
    }

    const whatsappMessage = buildTrialMessage(nome, telefone, nivel, periodo, mensagem, unidade);

    if (msgEl) {
      msgEl.textContent = 'Abrindo WhatsApp...';
    }

    openWhatsApp(whatsappMessage);

    setTimeout(() => {
      if (msgEl) {
        msgEl.textContent =
          'Caso o WhatsApp não abra automaticamente, clique no botão flutuante da página.';
      }
    }, 1200);
  });
}

handleTrialSubmit(trialForm, trialMsg, 'Casa Verde');
handleTrialSubmit(trialFormIpiranga, trialMsgIpiranga, 'Ipiranga');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}