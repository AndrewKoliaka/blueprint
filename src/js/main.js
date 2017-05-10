function showHideWorkerInit() {
    var z_coord = 1; //z-index value for worker description 
    $('.show_info_btn').click(function (event) {
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
        desc = $($('.worker_desc').get(index));
        desc.css('z-index', ++z_coord).toggleClass('table').toggleClass('none');
    });
}

function countUp() {
    $('.number').counterUp();
}

function navigation() {
    var navMenu = $('#nav_menu');
    var timerObj = setTimeout(function () {
        navMenu.addClass('nav_compressed');
    }, 5000);

    $('#close_menu_btn').click(function (event) {
        event.preventDefault();
        navMenu.toggleClass('nav_compressed');
    });
    navMenu.mouseenter(function () {
        clearTimeout(timerObj);
        navMenu.removeClass('nav_compressed');
    });
    navMenu.mouseleave(function () {
        if (!navMenu.hasClass('nav_compressed')) {
            timerObj = setTimeout(function () {
                navMenu.addClass('nav_compressed');
            }, 2000);
        }
    });
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