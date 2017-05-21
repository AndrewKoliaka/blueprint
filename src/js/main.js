function showHideWorkerInit() {
    var z_coord = 1; //z-index value for worker description 
    $('.show-info-btn').click(function (event) {
        event.stopPropagation();
        var target = $(event.target);
        var index = 0; //worker serial number
        var desc = null; //target description 
        if (event.target.tagName === 'I') {
            target.toggleClass('fa-plus').toggleClass('fa-minus');
            index = target.parent().index();
        } else {
            $(target.children().get(0)).toggleClass('fa-plus').toggleClass('fa-minus');
            index = target.index();
        }
        desc = $($('.worker-desc').get(index));
        desc.css('z-index', ++z_coord).toggleClass('table').toggleClass('none');
    });
}

function countUp() {
    $('.number').counterUp();
}

function navigation() {
    var windowWidth = $(window).width(),
        navMenu = $('#nav-menu'),
        showMenuBtn = $('#show-menu-btn'),
        hideMenuBtn = $('#hide-menu-btn');

    var timerObj = null;

    windowWidth <= 1200 ? menuForSmallScreen() : menuForLargeScreen();

    $(window).resize(function () {
        showMenuBtn.unbind();
        hideMenuBtn.unbind();
        navMenu.unbind();
        $('.nav-menu-element').unbind();
        clearInterval(timerObj);
        navMenu.removeClass('nav-compressed');
        $(window).width() <= 1200 ? menuForSmallScreen() : menuForLargeScreen();
    });

    function toggleButtons() {
        hideMenuBtn.toggleClass('none');
        showMenuBtn.toggleClass('none');
    }

    // screen width <= 1200
    function menuForSmallScreen() {
        $('#nav-menu-list').hide();

        hideMenuBtn.addClass('none');
        showMenuBtn.removeClass('none');

        function toggleSmallMenu() {
            $('#nav-menu-list').fadeToggle();
            toggleButtons();
        }

        function toggleMenuEventHandler(event) {
            event.preventDefault();
            toggleSmallMenu();
        }

        hideMenuBtn.click(toggleMenuEventHandler);
        showMenuBtn.click(toggleMenuEventHandler);
        $('.nav-menu-element').click(function () {
            setTimeout(toggleSmallMenu, 600);
        });
    }

    // screen width > 1200
    function menuForLargeScreen() {
        $('#nav-menu-list').show();

        timerObj = setTimeout(function () {
            navMenu.addClass('nav-compressed');
            hideMenuBtn.addClass('none');
            showMenuBtn.removeClass('none');
        }, 5000);

        function toggleMenuEventHandler(event) {
            event.preventDefault();
            toggleButtons();
            navMenu.toggleClass('nav-compressed');
        }

        hideMenuBtn.click(toggleMenuEventHandler);
        showMenuBtn.click(toggleMenuEventHandler);

        navMenu.mouseenter(function () {
            clearTimeout(timerObj);
            navMenu.removeClass('nav-compressed');
            hideMenuBtn.removeClass('none');
            showMenuBtn.addClass('none');
        });
        navMenu.mouseleave(function () {
            if (!navMenu.hasClass('nav-compressed')) {
                timerObj = setTimeout(function () {
                    navMenu.addClass('nav-compressed');
                    toggleButtons();
                }, 2000);
            }
        });
    }
}

$(document).ready(function () {
    carousel.init();
    showHideWorkerInit();
    countUp();
    navigation();

    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function () {
                window.location.hash = hash;
            });
        }
    });
});