(function () {
    'use strict';

    const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/YOUR_FORM_ID'; // Замените на свой ID
    const STORAGE_KEY = 'contactFormData';

    const form = document.getElementById('contactForm');
    const modal = document.getElementById('contactFormModal');
    const messageDiv = document.getElementById('formMessage');

    let bsModal;

    // Инициализация после загрузки DOM
    document.addEventListener('DOMContentLoaded', function () {
        bsModal = new bootstrap.Modal(modal);

        // События открытия/закрытия модального окна
        modal.addEventListener('show.bs.modal', handleModalShow);
        modal.addEventListener('hide.bs.modal', handleModalHide);

        // Обработка кнопки "Назад" в браузере
        window.addEventListener('popstate', handlePopState);

        // Отправка формы
        form.addEventListener('submit', handleSubmit);

        // Автосохранение данных при вводе
        setupAutoSave();

        // Проверка URL при загрузке страницы
        if (window.location.search.includes('contact=true')) {
            bsModal.show();
        }
    });

    function handleModalShow() {
        history.pushState({ modalOpen: true }, '', '?contact=true');
        loadFormData();
    }

    function handleModalHide() {
        if (window.location.search.includes('contact=true')) {
            history.back();
        }
        messageDiv.style.display = 'none';
    }

    function handlePopState() {
        if (modal.classList.contains('show')) {
            bsModal.hide();
        }
    }

    function saveFormData() {
        const formData = {
            fullName: document.getElementById('contactFullName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            organization: document.getElementById('contactOrganization').value,
            message: document.getElementById('contactMessage').value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                document.getElementById('contactFullName').value = data.fullName || '';
                document.getElementById('contactEmail').value = data.email || '';
                document.getElementById('contactPhone').value = data.phone || '';
                document.getElementById('contactOrganization').value = data.organization || '';
                document.getElementById('contactMessage').value = data.message || '';
            } catch (e) {
                console.error('Ошибка загрузки данных:', e);
            }
        }
    }

    function showMessage(text, isSuccess) {
        messageDiv.className = isSuccess ? 'alert alert-success' : 'alert alert-danger';
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = {
            fullName: document.getElementById('contactFullName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            organization: document.getElementById('contactOrganization').value,
            message: document.getElementById('contactMessage').value
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        try {
            const response = await fetch(FORMCARRY_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showMessage('Сообщение успешно отправлено!', true);
                localStorage.removeItem(STORAGE_KEY);
                form.reset();

                setTimeout(() => {
                    bsModal.hide();
                }, 2000);
            } else {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            console.error('Ошибка отправки:', error);
            showMessage('Ошибка при отправке. Попробуйте позже.', false);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        }
    }

    function setupAutoSave() {
        let saveTimeout;
        const fields = ['contactFullName', 'contactEmail', 'contactPhone', 'contactOrganization', 'contactMessage'];

        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', function () {
                    clearTimeout(saveTimeout);
                    saveTimeout = setTimeout(saveFormData, 500);
                });
            }
        });
    }
})();
