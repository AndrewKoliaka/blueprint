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
    var navMenu = $('#nav-menu');
    var timerObj = setTimeout(function () {
        navMenu.addClass('nav-compressed');
        toggleButtons();
    }, 5000);

    $('#hide-menu-btn').click(function (event) {
        event.preventDefault();
        toggleMenu();
    });

    $('#show-menu-btn').click(function (event) {
        event.preventDefault();
        toggleMenu();
    });
    navMenu.mouseenter(function () {
        clearTimeout(timerObj);
        navMenu.removeClass('nav-compressed');
        $('#hide-menu-btn').removeClass('none');
        $('#show-menu-btn').addClass('none');
    });
    navMenu.mouseleave(function () {
        if (!navMenu.hasClass('nav-compressed')) {
            timerObj = setTimeout(function () {
                navMenu.addClass('nav-compressed');
                toggleButtons();
            }, 2000);
        }
    });

    function toggleButtons() {
        $('#hide-menu-btn').toggleClass('none');
        $('#show-menu-btn').toggleClass('none');
    }

    function toggleMenu() {
        toggleButtons();
        navMenu.toggleClass('nav-compressed');
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