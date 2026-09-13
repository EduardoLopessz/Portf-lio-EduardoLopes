// coloca o ano atual no rodapé do modal
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// troca de aba (início, projetos, carreira, criações, sobre)
const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('[data-screen]');
const crumbLabel = document.getElementById('crumbLabel');
const jumpTriggers = document.querySelectorAll('[data-tab-jump]');

const TAB_LABELS = {
    inicio: 'início',
    projetos: 'projetos',
    carreira: 'carreira',
    criacoes: 'criações',
    sobre: 'sobre',
};

const TAB_ORDER = ['inicio', 'projetos', 'carreira', 'criacoes', 'sobre'];

function goToTab(id, updateHash) {
    if (updateHash === undefined) updateHash = true;

    const targetScreen = document.getElementById(id);
    if (!targetScreen) return;

    screens.forEach(screen => {
        screen.classList.toggle('is-active', screen.id === id);
    });

    tabs.forEach(tab => {
        const isActive = tab.dataset.tab === id;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    if (crumbLabel) crumbLabel.textContent = (TAB_LABELS[id] || id).toUpperCase();
    if (updateHash) history.replaceState(null, '', '#' + id);
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => goToTab(tab.dataset.tab));
});

jumpTriggers.forEach(el => {
    el.addEventListener('click', () => goToTab(el.dataset.tabJump));
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goToTab(el.dataset.tabJump);
        }
    });
});
