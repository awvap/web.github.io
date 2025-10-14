// Калькулятор стоимости заказа
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');
    
    // Функция для проверки корректности ввода количества
    function validateQuantity(input) {
        // Регулярное выражение для проверки на положительное целое число
        const regex = /^\d+$/;
        const match = input.match(regex);
        
        if (match === null || parseInt(input) <= 0) {
            return false;
        }
        return true;
    }
    
    // Функция для расчета стоимости заказа
    function calculateOrderCost() {
        // Получаем цену выбранного товара
        const productPrice = parseInt(productSelect.value);
        
        // Получаем количество товара
        const quantity = quantityInput.value;
        
        // Проверяем корректность ввода количества
        if (!validateQuantity(quantity)) {
            errorMessage.textContent = 'Пожалуйста, введите корректное количество (целое положительное число)';
            resultDiv.textContent = '';
            return;
        }
        
        // Сбрасываем сообщение об ошибке
        errorMessage.textContent = '';
        
        // Рассчитываем стоимость
        const totalCost = productPrice * parseInt(quantity);
        
        // Отображаем результат
        resultDiv.innerHTML = `
            <h3>Результат расчета:</h3>
            <p>Стоимость заказа: <strong>${totalCost} руб.</strong></p>
            <p>Цена товара: ${productPrice} руб.</p>
            <p>Количество: ${quantity} шт.</p>
        `;
    }
    
    // Назначаем обработчик события на кнопку расчета
    calculateBtn.addEventListener('click', calculateOrderCost);
    
    // Дополнительно: обработчик события на изменение количества для мгновенной валидации
    quantityInput.addEventListener('input', function() {
        if (!validateQuantity(this.value) && this.value !== '') {
            errorMessage.textContent = 'Пожалуйста, введите корректное количество (целое положительное число)';
        } else {
            errorMessage.textContent = '';
        }
    });
});