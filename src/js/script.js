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

// Classe que lida com o envio do formulário e exibe mensagens de sucesso ou erro
class FormSubmit {
    constructor(settings) {
        // Configurações para a instância da classe
        this.settings = settings;
        // Elemento do formulário
        this.form = document.querySelector(settings.form);
        // Botão do formulário
        this.formButton = document.querySelector(settings.button);
        // URL para onde o formulário será enviado
        if (this.form) {
            this.url = this.form.getAttribute('action');
        }
        // Bind da função sendForm para manter o contexto da instância da classe
        this.sendForm = this.sendForm.bind(this);
    }

    // Exibe uma mensagem de sucesso estilizada e redireciona após um período
    displaySuccess() {
        // Criar elemento div para a mensagem estilizada
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message'); // Adicionar uma classe para estilização com CSS
        successMessage.innerHTML = `
            <p class="success-text">${this.settings.success}</p>
            <p class="redirect-text">Você será redirecionado em breve...</p>
        `;
    
        this.form.innerHTML = ''; // Limpa o conteúdo do formulário
        this.form.appendChild(successMessage);
    
        // Redireciona para institutomagisterpi.com.br após 2 segundos (altere o valor conforme necessário)
        setTimeout(() => {
            window.location.href = "https://institutomagisterpi.com.br";
        }, 2000);
    }

    // Exibe uma mensagem de erro estilizada
    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    // Obtém um objeto contendo os dados do formulário
    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll('[name]');
        fields.forEach((field) => {
            formObject[field.getAttribute('name')] = field.value;
        });
        return formObject;
    }

    // Manipula a submissão do formulário, evitando o comportamento padrão e alterando o conteúdo do botão
    onSubmission(event) {
        event.preventDefault();
        event.target.innerHTML = 'Enviando....';
    }

    // Envia o formulário usando fetch, exibindo sucesso ou tratando erro
    async sendForm(event) {
        try {
            this.onSubmission(event);
            await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }

    // Inicializa a instância da classe, adicionando um ouvinte de evento ao botão do formulário
    init() {
        if (this.form)
            this.formButton.addEventListener('click', this.sendForm);
        return this;
    }
}

// Instância da classe FormSubmit com configurações específicas
const myFormSubmit = new FormSubmit({
    form: '[data-form]',
    button: '[data-button]',
    success: 'Mensagem enviada com sucesso. Em breve, entraremos em contato.',
    error: 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.',
});

// Inicializa a instância da classe
myFormSubmit.init();
