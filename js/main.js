"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // inputmask

    let phone = document.querySelectorAll("input[type='tel']"),
        im = new Inputmask("+7 (999) 999-99-99");
    im.mask(phone);

    //slider products

    const popularSlider = new Swiper('.popular__items', {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.popular__items-next',
            prevEl: '.popular__items-prev',
        },
        breakpoints: {
            574: {
                slidesPerView: 2,
            },
            900: {
                slidesPerView: 3,
            },
            1325: {
                slidesPerView: 4,
            }
        }
    });

    //objects-slider

    const objectSlider = new Swiper('.objects-slider', {
        speed: 600,
        spaceBetween: 20,
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.objects-slider__next',
            prevEl: '.objects-slider__prev',
        },
        breakpoints: {
            1325: {
                slidesPerView: 2,
            }
        }
    });

    //E-mail Ajax Send
    $(".form-send").submit(function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: th.serialize()
        }).done(function () {
            callbackModal.close();
            submitModal.open();
            $('.form').css('width', '100%');
            setTimeout(function () {
                // Выполнено
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    // modals
    var submitModal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Закрыть",
        cssClass: ['submit-modal'],
    });

    submitModal.setContent('<div class="modal__content"><h2 class="title modal__title">Спасибо!</h2><span class="modal__subtitle">Мы свяжемся с вами в течение 20 минут</span></div>');


    // scroll menu
    const menuBlock = document.querySelector('.header'),
        page = document.querySelector('.page');


    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= 300) {
            menuBlock.classList.add('header--fixed');
            page.classList.add('page--scroll');
        } else if (window.pageYOffset < 300) {
            menuBlock.classList.remove('header--fixed');
            page.classList.remove('page--scroll');
        }
    });

    // mobile menu

    const menuBtn = document.querySelector('.menu-btn'),
        menuClose = document.querySelector('.menu__close'),
        menu = document.querySelector('.menu'),
        body = document.querySelector('body');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.toggle('lock');
    });

    menuClose.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.remove('lock');
    });

    // sub-menu

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    const arrow = document.querySelectorAll('.carret');
    if (isMobile.any()) {
        body.classList.add('touch');
        for (let i = 0; i < arrow.length; i++) {
            let subMenu = arrow[i].nextElementSibling;
            arrow[i].addEventListener('click', ()=>{
                subMenu.classList.toggle('open');
                arrow[i].classList.toggle('active');
            });
        }
    } else {
        body.classList.add('mouse');
    }


});