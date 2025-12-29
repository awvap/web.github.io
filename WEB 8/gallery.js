// Галерея изображений с Slick Slider
$(document).ready(function () {
    // Инициализация слайдера
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        prevArrow: '<button type="button" class="slick-prev">‹</button>',
        nextArrow: '<button type="button" class="slick-next">›</button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false
                }
            }
        ]
    });

    // Функция для расчета и обновления пейджера
    function updatePager() {
        const slider = $('.slider');
        const currentSlide = slider.slick('slickCurrentSlide');
        const slideCount = slider.slick('getSlick').slideCount;
        const slidesToShow = slider.slick('slickGetOption', 'slidesToShow');

        // Рассчитываем текущую страницу и общее количество страниц
        const currentPage = Math.floor(currentSlide / slidesToShow) + 1;
        const totalPages = Math.ceil(slideCount / slidesToShow);

        // Обновляем отображение пейджера
        $('#currentPage').text(currentPage);
        $('#totalPages').text(totalPages);
    }

    // Обработчики событий слайдера
    $('.slider').on('afterChange', function (event, slick, currentSlide) {
        updatePager();
    });

    // Обработчик изменения размера окна
    $(window).on('resize', function () {
        // Небольшая задержка для стабилизации ресайза
        setTimeout(updatePager, 100);
    });

    // Инициализация пейджера при загрузке
    updatePager();
});