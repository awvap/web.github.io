// Калькулятор стоимости услуги
function updateServicePrice() {
    // Находим элементы в DOM
    let quantityInput = document.getElementById("serviceQuantity");
    let serviceTypeRadios = document.getElementsByName("serviceType");
    let optionsSelect = document.getElementById("serviceOptions");
    let propertyCheckbox = document.getElementById("serviceProperty");

    let price = 0;
    let prices = getServicePrices();
    let quantity = parseInt(quantityInput.value) || 1;

    // Определяем выбранный тип услуги
    let selectedServiceType = "";
    serviceTypeRadios.forEach(function (radio) {
        if (radio.checked) {
            selectedServiceType = radio.value;
        }
    });

    // Получаем базовую цену для выбранного типа услуги
    let priceIndex = parseInt(selectedServiceType) - 1;
    if (priceIndex >= 0) {
        price = prices.serviceTypes[priceIndex];
    }

    // Управляем видимостью дополнительных элементов
    let optionsDiv = document.getElementById("serviceOptionsDiv");
    let propertyDiv = document.getElementById("servicePropertyDiv");

    // Первый тип услуги - без опций и свойств
    if (selectedServiceType === "1") {
        optionsDiv.style.display = "none";
        propertyDiv.style.display = "none";
    }
    // Второй тип услуги - только опции (селект)
    else if (selectedServiceType === "2") {
        optionsDiv.style.display = "block";
        propertyDiv.style.display = "none";

        // Добавляем стоимость выбранной опции
        let selectedOption = optionsSelect.value;
        let optionPrice = prices.serviceOptions[selectedOption];
        if (optionPrice !== undefined) {
            price += optionPrice;
        }
    }
    // Третий тип услуги - только свойство (чекбокс)
    else if (selectedServiceType === "3") {
        optionsDiv.style.display = "none";
        propertyDiv.style.display = "block";

        // Добавляем стоимость свойства, если выбрано
        if (propertyCheckbox.checked) {
            let propertyPrice = prices.serviceProperties.property1;
            if (propertyPrice !== undefined) {
                price += propertyPrice;
            }
        }
    }

    // Умножаем на количество
    let totalPrice = price * quantity;

    // Обновляем отображение цены
    let servicePriceElement = document.getElementById("servicePrice");
    servicePriceElement.innerHTML = totalPrice + " рублей";

    // Показываем детали расчета
    showServicePriceDetails(price, quantity, totalPrice, selectedServiceType);
}

function getServicePrices() {
    return {
        serviceTypes: [1000, 2500, 1500], // Базовая стоимость для каждого типа услуги
        serviceOptions: {
            option1: 500,   // Дополнительная стоимость для опции 1
            option2: 800,   // Дополнительная стоимость для опции 2
            option3: 1200   // Дополнительная стоимость для опции 3
        },
        serviceProperties: {
            property1: 300  // Дополнительная стоимость для свойства
        }
    };
}

function showServicePriceDetails(basePrice, quantity, totalPrice, serviceType) {
    let detailsElement = document.getElementById("servicePriceDetails");
    let detailsHTML = "<div class='price-details'>";

    detailsHTML += "<p>Базовая стоимость: " + basePrice + " руб. × " + quantity + " = " + totalPrice + " руб.</p>";

    // Добавляем информацию о типе услуги
    let serviceNames = {
        "1": "Базовая услуга",
        "2": "Премиум услуга",
        "3": "Кастомная услуга"
    };
    detailsHTML += "<p>Тип услуги: " + (serviceNames[serviceType] || "Неизвестно") + "</p>";

    detailsHTML += "</div>";
    detailsElement.innerHTML = detailsHTML;
}

window.addEventListener('DOMContentLoaded', function (event) {
    // Изначально скрываем дополнительные элементы
    let optionsDiv = document.getElementById("serviceOptionsDiv");
    let propertyDiv = document.getElementById("servicePropertyDiv");
    optionsDiv.style.display = "none";
    propertyDiv.style.display = "none";

    // Назначаем обработчики для радиокнопок типа услуги
    let serviceTypeRadios = document.getElementsByName("serviceType");
    serviceTypeRadios.forEach(function (radio) {
        radio.addEventListener("change", function (event) {
            updateServicePrice();
        });
    });

    // Назначаем обработчик для поля количества
    let quantityInput = document.getElementById("serviceQuantity");
    quantityInput.addEventListener("input", function (event) {
        updateServicePrice();
    });

    // Назначаем обработчик для селекта опций
    let optionsSelect = document.getElementById("serviceOptions");
    optionsSelect.addEventListener("change", function (event) {
        updateServicePrice();
    });

    // Назначаем обработчик для чекбокса свойства
    let propertyCheckbox = document.getElementById("serviceProperty");
    propertyCheckbox.addEventListener("change", function (event) {
        updateServicePrice();
    });

    // Инициализируем расчет цены
    updateServicePrice();
});