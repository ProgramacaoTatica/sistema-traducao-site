document.addEventListener('DOMContentLoaded', () => {
    const elementsToTranslate = {
        greeting: document.getElementById('greeting'),
        description: document.getElementById('description'),
        description2: document.getElementById('description2'),
        footer: document.getElementById('footer'),
        navigation: document.getElementById('navigation'),
        navigation2: document.getElementById('navigation2'),
        navigation3: document.getElementById('navigation3'),
        contato: document.getElementById('contato')
    };
    
    let translations;

    // Função para carregar o arquivo JSON de traduções
    function loadTranslations() {
        return fetch('translations.json')
            .then(response => response.json())
            .then(data => {
                translations = data;
            });
    }

    // Função para traduzir o texto
    function translate(language) {
        if (translations && translations[language]) {
            for (const key in elementsToTranslate) {
                if (elementsToTranslate[key] && translations[language][key]) {
                    elementsToTranslate[key].textContent = translations[language][key];
                }
            }
            localStorage.setItem('language', language);
        }
    }

    // Carregar traduções ao iniciar
    loadTranslations().then(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            translate(storedLanguage);
        } else {
            translate('pt'); // Padrão para português se nada estiver armazenado
        }
    });

    // Eventos para botões de tradução
    document.getElementById('translate-en').addEventListener('click', () => {
        translate('en');
    });

    document.getElementById('translate-pt').addEventListener('click', () => {
        translate('pt');
    });
});