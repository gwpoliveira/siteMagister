document.addEventListener('DOMContentLoaded', function () {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const cookieSettingsBtn = document.getElementById('cookie-settings');

    // Verifica se o usuário já aceitou os cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }

    // Função para adicionar cookies (substitua com suas configurações específicas)
    function addCookies() {
        // Adicione aqui a lógica para configurar os cookies do seu site
        // Exemplo: document.cookie = "nome_do_cookie=valor; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;";
    }

    // Adiciona evento de clique para aceitar cookies
    acceptCookiesBtn.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', true);
        cookieBanner.style.display = 'none';
        addCookies(); // Adiciona os cookies ao clicar em "Aceitar Todos os Cookies"
    });

    // Adiciona evento de clique para configurar cookies (você pode implementar esta parte conforme a necessidade)
    cookieSettingsBtn.addEventListener('click', function () {
        // Implemente as configurações de cookies aqui
    });
});